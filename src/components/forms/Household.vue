<template>
  <div class="q-ma-md">
    <div v-if="$route.params.action" class="q-mx-md q-mt-md text-center bg-secondary text-white q-py-md">
      {{$route.params.action.toUpperCase()}} HOUSEHOLD <small>{{$store.state.societyname}} society</small>
    </div>
    <q-form>
      <div class="q-ma-md">
        <q-input outlined hide-bottom-space error-message="Addressee is required" label="Addressee" v-model="form.addressee" :rules="[ val => val.length >= 1 ]" />
      </div>
      <div class="q-ma-md">
        <q-input outlined label="Residential Address" v-model="form.addr1"/>
        <q-input class="q-my-sm" outlined v-model="form.addr2"/>
        <q-input outlined v-model="form.addr3"/>
      </div>
      <div class="q-ma-md">
        <q-input outlined label="Home phone" v-model="form.homephone"/>
      </div>
      <div class="q-ma-md">
        <q-select outlined label="Household cellphone" v-model="form.householdcell" :options="housecellOptions" map-options emit-value/>
      </div>
      <div class="q-ma-md text-center">
        <q-btn color="primary" @click="submit">OK</q-btn>
        <q-btn class="q-ml-md" color="black" @click="$router.back()">Cancel</q-btn>
      </div>
    </q-form>
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
          .catch(error => {
            if (error.code === 'ECONNABORTED') {
              this.$q.notify('Server connection timed out - are you offline?')
            } else {
              console.log(error)
            }
          })
      }
    }
  },
  mounted () {
    if (!this.$store.state.individual.household) {
      this.$router.push({ name: 'home' })
    }
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
