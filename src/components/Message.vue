<template>
  <div class="layout-padding">
    <p class="caption text-center">Messages</p>
    <q-chat-message class="q-mx-sm" v-for="chat in chats" :key="chat.id" :name="chat.sender" :text="[chat.chat]" :stamp="chat.created_at" :sent="chat.sent"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chats: []
    }
  },
  mounted () {
    this.$axios.get(this.$store.state.hostname + '/message/' + this.$route.params.id)
      .then((response) => {
        for (var chat in response.data) {
          var newitem = response.data[chat]
          if (response.data[chat].individual) {
            newitem.sender = response.data[chat].individual.firstname + ' ' + response.data[chat].individual.surname
            newitem.sent = true
          } else {
            newitem.sent = false
            if (response.data[chat].chatable_type === 'Bishopm\\Churchnet\\Models\\Society') {
              newitem.sender = response.data[chat].chatable.society + ' Society'
            } else if (response.data[chat].chatable_type === 'Bishopm\\Churchnet\\Models\\Circuit') {
              newitem.sender = response.data[chat].chatable.circuit
            } else if (response.data[chat].chatable_type === 'Bishopm\\Churchnet\\Models\\Group') {
              newitem.sender = response.data[chat].chatable.groupname
            } else if (response.data[chat].chatable_type === 'Bishopm\\Churchnet\\Models\\District') {
              newitem.sender = response.data[chat].chatable.society + ' District'
            }
            console.log(response.data[chat].chatable_type)
          }
          this.chats.push(newitem)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'JOURNEY_Societies'
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
