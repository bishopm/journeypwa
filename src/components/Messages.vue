<template>
  <div class="layout-padding">
    <p class="caption text-center">Messages</p>
    <q-list v-if="messages" class="no-border">
      <q-item v-for="message in messages" :key="message.id" :to="'/message/' + message.id">
        <q-item-main>
          <span v-if="message.chatable.society">{{message.chatable.society}} Society</span>
          <span v-else-if="message.chatable.groupname">{{message.chatable.groupname}}</span>
          <span v-else-if="message.chatable.circuit">{{message.chatable.circuit}}</span>
          <span v-else-if="message.chatable.district">{{message.chatable.district}} District</span>
        </q-item-main>
        <q-item-side class="text-right">
          <q-chip color="primary">{{message.messages.length}}</q-chip>
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      messages: []
    }
  },
  mixins: [saveState],
  mounted () {
    if (!this.$store.state.individual) {
      this.$router.push({ name: 'home' })
    }
    this.messages = this.$store.state.individual.chats
  },
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'JOURNEY_Messages'
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
