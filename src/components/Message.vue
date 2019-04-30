<template>
  <div class="q-ma-md">
    <div v-if="chat.chatable">
      <p v-if="chat.chatable.society" class="caption text-center">Messages: {{chat.chatable.society}} society</p>
      <p v-else-if="chat.chatable.groupname" class="caption text-center">Messages: {{chat.chatable.groupname}}</p>
      <p v-else-if="chat.chatable.circuit" class="caption text-center">MESSAGES: {{chat.chatable.circuit}}</p>
      <p v-else-if="chat.chatable.district" class="caption text-center">Messages: {{chat.chatable.district}} District</p>
      <q-chat-message class="q-mx-sm" v-for="message in chat.messages" :key="message.id" :name="message.individual.firstname + ' ' + message.individual.surname" :text="[message.chat]" :stamp="message.ago" :sent="checksent(message.individual)"/>
    </div>
    <q-input v-model="newmess.chat" type="textarea" label="Reply" :max-height="60" rows="4" :after="[{icon: 'keyboard_return', handler: sendmsg}]"></q-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chat: {},
      newmess: {}
    }
  },
  mounted () {
    if (!this.$store.state.individual) {
      this.$router.push({ name: 'home' })
    }
    this.$axios.get(process.env.API + '/message/' + this.$route.params.id)
      .then((response) => {
        this.chat = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    sendmsg () {
      this.newmess.individual_id = this.$store.state.individual.id
      this.newmess.chat_id = this.chat.id
      this.$axios.post(process.env.API + '/message',
        {
          message: this.newmess
        })
        .then((response) => {
          this.chat.messages.push(response.data)
          this.newmess.chat = ''
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    checksent (indiv) {
      if ((indiv) && (indiv.id === this.$store.state.individual.id)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
p {
  margin-bottom: 0px;
}
</style>
