<template>
  <div class="layout-padding">
    <div v-if="$route.params.action" class="q-mx-md q-mt-md text-center caption">
      {{$route.params.action.toUpperCase()}} INDIVIDUAL
    </div>
    <div class="q-ma-md">
      <q-field :error="$v.form.surname.$error" error-label="The surname field is required">
        <q-input float-label="Surname" v-model="form.surname" @blur="$v.form.surname.$touch()" :error="$v.form.surname.$error" />
      </q-field>
    </div>
    <div class="q-ma-md">
      <q-field :error="$v.form.firstname.$error" error-label="The firstname field is required">
        <q-input float-label="First name" v-model="form.firstname" @blur="$v.form.firstname.$touch()" :error="$v.form.firstname.$error" />
      </q-field>
    </div>
    <div class="q-ma-md">
      <q-select float-label="Sex" v-model="form.sex" :options="[{ label: 'female', value: 'female' }, { label: 'male', value: 'male' }]"/>
    </div>
    <div class="q-ma-md">
      <q-select float-label="Title" v-model="form.title" :options="[{ label: 'Dr', value: 'Dr' }, { label: 'Mr', value: 'Mr' }, { label: 'Mrs', value: 'Mrs' }, { label: 'Ms', value: 'Ms' }, { label: 'Prof', value: 'Prof' }, { label: 'Rev', value: 'Rev' }]"/>
    </div>
    <div class="q-ma-md">
      <q-datetime class="q-mb-md" float-label="Date of birth" v-model="form.birthdate" format="YYYY-MM-DD" type="date" />
    </div>
    <div class="q-ma-md">
      <q-field :error="$v.form.email.$error" error-label="Must be a valid email address">
        <q-input float-label="Email" v-model="form.email" @blur="$v.form.email.$touch()" :error="$v.form.email.$error" />
      </q-field>
    </div>
    <div class="q-ma-md">
      <q-field :error="$v.form.cellphone.$error" error-label="Phone numbers must be numeric">
        <q-input float-label="Cellphone" v-model="form.cellphone" @blur="$v.form.cellphone.$touch()" :error="$v.form.cellphone.$error" />
      </q-field>
    </div>
    <div class="q-ma-md">
      <q-btn color="primary" @click="submit">Submit</q-btn>
      <q-btn class="q-ml-md" color="secondary" @click="$router.back()">Cancel</q-btn>
      <q-btn class="q-ml-md" color="red">Delete</q-btn>
    </div>
  </div>
</template>

<script>
import { required, numeric, email } from 'vuelidate/lib/validators'
// https://github.com/monterail/vuelidate/tree/master/src/validators
export default {
  data () {
    return {
      form: {
        surname: this.$store.state.individual.household.sortsurname,
        firstname: '',
        birthdate: '',
        title: '',
        email: '',
        sex: 'female',
        cellphone: '',
        household_id: this.$store.state.individual.household_id,
        id: ''
      }
    }
  },
  validations: {
    form: {
      surname: { required },
      firstname: { required },
      email: { email },
      cellphone: { numeric }
    }
  },
  methods: {
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Please check for errors!')
      } else {
        this.form.birthdate = this.form.birthdate.slice(0, 10)
        this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
        this.$axios.post(process.env.API + '/individual',
          {
            surname: this.form.surname,
            firstname: this.form.firstname,
            sex: this.form.sex,
            cellphone: this.form.cellphone,
            birthdate: this.form.birthdate,
            title: this.form.title,
            email: this.form.email,
            household_id: this.form.household_id,
            id: this.form.id
          })
          .then(response => {
            this.$q.notify('Database successfully updated')
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
</style>
