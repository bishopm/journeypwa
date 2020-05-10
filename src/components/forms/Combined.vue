<template>
  <div class="q-ma-md">
    <div class="q-mx-md q-mt-md text-center caption">
      <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Add my details to the {{$store.state.societyname}} member database</p>
      <p class="instructions">Please complete this brief form - you can add other details and other members of your household later.</p>
    </div>
    <q-form>
      <div class="q-ma-md">
        <q-input outlined label="First name" v-model="form.firstname" :rules="[val => !!val || 'First name is required']"/>
      </div>
      <div class="q-ma-md">
        <q-input outlined label="Surname" v-model="form.surname" :rules="[val => !!val || 'Surname is required']"/>
      </div>
      <div class="q-ma-md">
        <q-radio v-model="form.sex" val="female" label="Female" />
        <q-radio class="q-ml-md" v-model="form.sex" val="male" label="Male" />
      </div>
      <div class="q-ma-lg text-center">
        <q-btn color="primary" @click="submit">OK</q-btn>
        <q-btn class="q-mx-md" color="black" @click="$router.back()">Cancel</q-btn>
        <q-btn class="q-my-md" color="grey-6" to="/settings">Not at {{$store.state.societyname}}? Change to another society</q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        surname: '',
        firstname: '',
        sex: 'female',
        phone: this.$q.localStorage.getItem('JOURNEY_VerifiedPhone'),
        society_id: this.$q.localStorage.getItem('JOURNEY_Society')
      }
    }
  },
  methods: {
    submit () {
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.post(process.env.API + '/combined',
        {
          surname: this.form.surname,
          firstname: this.form.firstname,
          sex: this.form.sex,
          phone: this.form.phone,
          phonetoken: this.$q.localStorage.getItem('JOURNEY_Phonetoken'),
          society_id: this.form.society_id,
          adduser: 'yes'
        })
        .then(response => {
          this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
          this.$axios.post(process.env.API + '/phone',
            {
              phone: this.$q.localStorage.getItem('JOURNEY_VerifiedPhone'),
              society_id: this.$q.localStorage.getItem('JOURNEY_Society')
            })
            .then(response => {
              if (response.data.individual) {
                this.$store.commit('setIndividual', response.data.individual)
                if (!this.$q.localStorage.getItem('JOURNEY_Individual')) {
                  this.$q.localStorage.set('JOURNEY_Individual', JSON.stringify(response.data.individual))
                }
              }
              this.$q.notify('Success! You may now edit your details as needed')
              this.$router.push({ name: 'me' })
            })
            .catch(error => {
              if (error.code === 'ECONNABORTED') {
                this.$q.notify('Server connection timed out - are you offline?')
              } else {
                console.log(error)
              }
            })
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
}
</script>

<style>
  a {
    text-decoration: none;
    color:white;
  }
  .instructions {
    line-height: 1;
    margin: 0;
    font-size: small;
  }
</style>
