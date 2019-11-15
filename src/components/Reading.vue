<template>
  <div class="text-center" v-if="readings.length">
    <q-tabs v-model="selectedTab" active-color="white" indicator-color="primary" class="no-border bg-secondary text-primary" q-tabs-two-lines>
      <q-tab v-for="readingHeader in readingHeaders" :name="readingHeader" :key="readingHeader">{{cleanup(readingHeader)}}</q-tab>
    </q-tabs>
    <q-tab-panels v-model="selectedTab" animated class="q-ma-sm">
      <q-tab-panel v-for="reading in readings" :key="reading.title" :name="reading.title" class="no-border">
        <div v-for="section in reading.text" :key="section['section']" class="text-justify">
          <div class="q-my-md" v-if="section['type']=='optional'"><div class="text-center"><b>Optional verses</b></div>
            <i><div v-html="section['section']"></div></i>
          </div>
          <div v-else class="q-my-md" v-html="section['section']"></div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <small><div class="text-justify q-ma-md" v-html="readings[0].copyright"></div></small>
  </div>
</template>

<script>
export default {
  data () {
    return {
      readings: [],
      readingHeaders: [],
      bible: '',
      selectedTab: ''
    }
  },
  methods: {
    cleanup (textin) {
      return textin.replace(/\[/g, ' [').replace(/,/g, ', ')
    }
  },
  mounted () {
    if (this.$q.localStorage.getItem('JOURNEY_Bible')) {
      this.bible = this.$q.localStorage.getItem('JOURNEY_Bible')
    } else {
      this.bible = 'GNT'
    }
    this.$axios.get(process.env.API + '/reading/' + this.$route.params.reading + '/' + this.bible)
      .then((response) => {
        for (var value in response.data.titles) {
          this.readingHeaders.push(response.data.titles[value])
        }
        for (var ndx in response.data.texts) {
          this.readings.push(response.data.texts[ndx])
        }
        this.selectedTab = this.readingHeaders[0]
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
#map {
  text-align:center;
  height: 300px;
  width: 100%;
}
.s, .s1 {
  font-size: 110%;
  line-height: 18px;
  padding: 0;
  padding-top: 5px;
  text-align: center;
  font-weight: bold;
}
.v {
  font-weight: bold;
  vertical-align: super;
  font-size: 80%;
  vertical-align: baseline;
  position: relative;
  top: -0.4em;
}
.r {
  text-align:center;
  font-size: 80%;
}
.q1 {
  margin: 0;
}
h2 {
  text-align:center;
  font-size:140%;
  font-weight: bold;
  line-height:0;
  padding: 0px;
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
.q-tabs {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
p {
  margin-bottom: 8px;
}
</style>
