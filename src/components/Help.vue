<template>
  <div class="q-ma-md text-justify">
    <p class="bg-secondary text-white caption text-center q-pa-sm">Help and feedback</p>
    <p>If you're experiencing problems with the app or have a suggestion, send us a message below:</p>
    <q-form>
      <q-input v-model="name" label="Name"/>
      <q-input v-model="email" class="q-my-sm" label="Email"/>
      <q-input v-model="message" outlined type="textarea"/>
      <div class="text-center">
        <q-btn @click="sendmessage" color="secondary" class="q-ma-md" label="Send feedback"></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      name: '',
      email: ''
    }
  },
  mounted () {
    if (this.$store.state.individual) {
      this.name = this.$store.state.individual.firstname + ' ' + this.$store.state.individual.surname
    }
  },
  methods: {
    sendmessage () {
      this.$axios.post(process.env.API + '/feedback',
        {
          message: this.message,
          name: this.name,
          email: this.email,
          phone: localStorage.getItem('SYNOD_verifiedphone')
        })
        .then(response => {
          this.$q.notify('Thank you for your feedback!')
          this.$router.push({ name: 'home' })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>
