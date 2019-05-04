<template>
  <div class="q-ma-md">
    <div class="q-mx-md q-mt-md text-center caption">
      <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Add my details to the {{$store.state.societyname}} member database</p>
      <p id="instructions">Please complete this brief form - you can add other details and other members of your household later.</p>
    </div>
    <div class="q-ma-md">
      <q-field :error="$v.form.firstname.$error" error-label="The firstname field is required">
        <q-input label="First name" v-model="form.firstname" @blur="$v.form.firstname.$touch()" :error="$v.form.firstname.$error" />
      </q-field>
    </div>
    <div class="q-ma-md">
      <q-field :error="$v.form.surname.$error" error-label="The surname field is required">
        <q-input label="Surname" v-model="form.surname" @blur="$v.form.surname.$touch()" :error="$v.form.surname.$error" />
      </q-field>
    </div>
    <div class="q-ma-md">
      <q-radio v-model="form.sex" val="female" label="Female" />
      <q-radio class="q-ml-md" v-model="form.sex" val="male" label="Male" />
    </div>
    <div class="q-ma-lg text-center">
      <q-btn color="primary" @click="submit">OK</q-btn>
      <q-btn class="q-ml-md" color="black" @click="$router.back()">Cancel</q-btn>
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
            society_id: this.form.society_id,
            adduser: 'yes'
          })
          .then(response => {
            this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
            this.$axios.post(process.env.API + '/phone',
              {
                phone: localStorage.getItem('JOURNEY_VerifiedPhone'),
                society_id: localStorage.getItem('JOURNEY_Society')
              })
              .then(response => {
                if (response.data.individual) {
                  this.$store.commit('setIndividual', response.data.individual)
                  if (!localStorage.getItem('JOURNEY_Individual')) {
                    localStorage.setItem('JOURNEY_Individual', JSON.stringify(response.data.individual))
                  }
                }
                this.$q.notify('Success! You may now edit your details as needed')
                this.$router.push({ name: 'me' })
              })
              .catch(function (error) {
                console.log(error)
              })
          })
          .catch(function (error) {
            console.log(error)
            this.$q.loading.hide()
          })
      }
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
