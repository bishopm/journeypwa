<template>
  <div class="q-mt-xs layout-padding" v-if="groups.length">
    <div v-for="item in groups" :key="item.title">
      <div class="text-center caption">{{item.title}}</div>
      <div v-html="item.body"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      groups: []
    }
  },
  mounted () {
    this.groups = this.$store.state.feeditems.groups
  }
}
</script>

<style>
#map {
  text-align:center;
  height: 300px;
  width: 100%;
}
.s1 {
  font-size: 110%;
  line-height: 18px;
  padding: 0;
  text-align: center;
}
.q1 {
  margin: 0;
}
h4 {
  line-height: 0px;
  font-weight:600;
}
h5.r {
  line-height: 0px;
  font-style: italic;
  font-size: 70%;
}
</style>
