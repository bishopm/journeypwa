<template>
  <div class="layout-padding text-justify">
    <p>You are welcome to use the app anonymously. However if you are a church member, we encourage you to add your details - this will allow you to access sections of the app reserved for members (including messaging).</p>
    <p>You may also use the app and provide your details later through the Settings panel.</p>
    <div class="text-center">
      <q-btn class="q-mt-xs" color="secondary" :to="anonymize()">Use the app anonymously</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      events: null
    }
  },
  methods: {
    anonymize () {
      console.log('1')
    }
  }
}
</script>

<style>
</style>
