<template>
  <div v-if="society" class="text-center">
    <p class="bg-secondary q-py-md text-white text-bold text-center caption">{{society.society}}</p><br>
    <p v-for="service in society.services" :key="service.id">{{service.servicetime}} ({{service.language}})</p><br>
    <div v-if="society.website"><a target="_blank" :href="society.websiteurl">{{society.website}}</a></div>
    <leafletmap v-if="society.location" :latitude="society.location.latitude" :longitude="society.location.longitude" :popuplabel="society.society + ' Methodist Church'" editable="no"></leafletmap>
  </div>
</template>

<script>
import leafletmap from './Leafletmap'
export default {
  data () {
    return {
      society: {},
      map: null,
      marker: null
    }
  },
  components: {
    'leafletmap': leafletmap
  },
  mounted () {
    this.$axios.get(process.env.API + '/societies/' + this.$route.params.id)
      .then((response) => {
        this.society = response.data
        if (this.society.website) {
          if ((this.society.website) && (!this.society.website.includes('http'))) {
            this.society.websiteurl = 'http://' + this.society.website
          } else {
            if (this.society.website) {
              this.society.websiteurl = this.society.website
            }
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
</style>
