<template>
  <div class="layout-padding">
    <p class="caption text-center">Messages</p>
    <q-list class="no-border">
      <q-item v-if="messages" v-for="message in messages" :key="message.id" :to="'/societies/'">
        <q-item-main>
          {{message.chatable_type.slice(1+message.chatable_type.lastIndexOf('\\'))}}
        </q-item-main>
        <q-item-side class="text-right">
          Side
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
    this.messages = this.$store.state.individual.chats
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
