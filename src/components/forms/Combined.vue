<template>
  <div class="layout-padding">
    <div class="q-mx-md q-mt-md text-center caption">
      Add my details to the {{$store.state.societyname}} database
      <p id="instructions">Please complete this brief form - you can add other details and other members of your household later.</p>
    </div>
    <div class="q-ma-md">
      <q-field :error="$v.form.firstname.$error" error-label="The firstname field is required">
        <q-input float-label="First name" v-model="form.firstname" @blur="$v.form.firstname.$touch()" :error="$v.form.firstname.$error" />
      </q-field>
    </div>
    <div class="q-ma-md">
      <q-field :error="$v.form.surname.$error" error-label="The surname field is required">
        <q-input float-label="Surname" v-model="form.surname" @blur="$v.form.surname.$touch()" :error="$v.form.surname.$error" />
      </q-field>
    </div>
    <div class="q-ma-md">
      <q-radio v-model="form.sex" val="female" label="Female" />
      <q-radio class="q-ml-md" v-model="form.sex" val="male" label="Male" />
    </div>
    <div class="q-ma-md">
      <q-btn color="primary" @click="submit">Submit</q-btn>
      <q-btn class="q-ml-md" color="secondary" @click="$router.back()">Cancel</q-btn>
      <q-btn class="q-ml-md" color="red">Delete</q-btn>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
// https://github.com/monterail/vuelidate/tree/master/src/validators
export default {
  data () {
    return {
      form: {
        surname: '',
        firstname: '',
        sex: 'female',
        phone: localStorage.getItem('JOURNEY_VerifiedPhone'),
        society_id: localStorage.getItem('JOURNEY_Society')
      }
    }
  },
  validations: {
    form: {
      surname: { required },
      firstname: { required }
    }
  },
  methods: {
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Please check for errors!')
      } else {
        this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
        this.$axios.post(process.env.API + '/combined',
          {
            surname: this.form.surname,
            firstname: this.form.firstname,
            sex: this.form.sex,
            phone: this.form.phone,
            society_id: this.form.society_id
          })
          .then(response => {
            this.$q.notify('Your details have been added')
            this.$router.push({ name: 'home' })
          })
          .catch(function (error) {
            console.log(error)
            this.$q.loading.hide()
          })
      }
    }
  },
  mounted () {
    if (this.$route.params.action === 'edit') {
      this.form = this.$route.params.individual
    }
  }
}
</script>

<style>
  a {
    text-decoration: none;
    color:white;
  }
  #instructions {
    line-height: 1;
    margin: 0;
    font-size: small;
  }
</style>
