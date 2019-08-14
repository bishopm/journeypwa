<template>
  <q-list>
    <q-item v-for="(item, ndx) in contents" :key="ndx" :to="'/content/' + $route.params.ctype + '/' + item.id">
      <q-item-section class="text-center">
        <q-item-label>{{item.feedpost.title}}</q-item-label>
        <q-item-label caption>{{item.feedpost.publicationdate}} <b>({{item.source}})</b></q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  data () {
    return {
      contents: []
    }
  },
  mounted () {
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.post(process.env.API + '/feedarchive',
      {
        society: this.$store.state.societyid,
        contenttype: this.$route.params.ctype
      })
      .then(response => {
        this.contents = response.data
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
</script>

<style>
h5 {
  line-height: 0px;
  font-style: italic;
  font-size: 70%;
}
</style>
