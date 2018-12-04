<template>
  <div class="layout-padding">
    <div v-if="$route.params.action" class="q-mx-md q-mt-md text-center caption">
      {{$route.params.action.toUpperCase()}} HOUSEHOLD <small>{{$store.state.societyname}} society</small>
    </div>
    <div class="q-ma-md">
      <q-field :error="$v.form.addressee.$error" error-label="The addressee field is required">
        <q-input float-label="Addressee" v-model="form.addressee" @blur="$v.form.addressee.$touch()" :error="$v.form.addressee.$error" />
      </q-field>
    </div>
    <div class="q-ma-md">
      <q-input float-label="Residential Address" v-model="form.addr1"/>
      <q-input v-model="form.addr2"/>
      <q-input v-model="form.addr3"/>
    </div>
    <div class="q-ma-md">
      <q-field :error="$v.form.homephone.$error" error-label="Phone numbers must be numeric">
        <q-input float-label="Home phone" v-model="form.homephone" @blur="$v.form.homephone.$touch()" :error="$v.form.homephone.$error" />
      </q-field>
    </div>
    <div class="q-ma-md">
      <q-select float-label="Household cellphone" v-model="form.householdcell" :options="housecellOptions"/>
    </div>
    <div class="q-ma-md text-center">
      <q-btn color="primary" @click="submit">OK</q-btn>
      <q-btn class="q-ml-md" color="black" @click="$router.back()">Cancel</q-btn>
    </div>
  </div>
</template>

<script>
import { required, numeric } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        addressee: '',
        addr1: '',
        addr2: '',
        addr3: '',
        homephone: '',
        householdcell: '',
        id: ''
      },
      housecellOptions: []
    }
  },
  validations: {
    form: {
      addressee: { required },
      homephone: { numeric }
    }
  },
  methods: {
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Please check for errors!')
      } else {
        this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
        this.$axios.post(process.env.API + '/household',
          {
            addressee: this.form.addressee,
            addr1: this.form.addr1,
            addr2: this.form.addr2,
            addr3: this.form.addr3,
            homephone: this.form.homephone,
            householdcell: this.form.householdcell,
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
      this.form = this.$store.state.individual.household
      for (var ikey in this.form.individuals) {
        var newitem = {
          label: this.form.individuals[ikey].firstname,
          value: this.form.individuals[ikey].id
        }
        if (this.form.individuals[ikey].cellphone) {
          this.housecellOptions.push(newitem)
        }
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
</style>
