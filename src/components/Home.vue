<template>
  <div class="layout-padding">
    <div class="row q-mt-lg">
      <div v-if="menu_media()" class="col-6 text-center q-mb-md">
        <div>Media / articles</div>
        <q-icon class="text-primary" name="art-track" size="6rem" />
      </div>
      <div v-if="menu_groups()" class="col-6 text-center q-mb-md">
        <router-link to="/groups" class="text-white" style="text-decoration:none;">
          <div class="text-black">Small groups</div>
          <q-icon class="text-primary" name="group" size="6rem" />
        </router-link>
      </div>
      <div v-if="menu_practice()" class="col-6 text-center q-mb-md">
        <div>Practical exercise</div>
        <q-icon class="text-primary" name="pan_tool" size="6rem" />
      </div>
      <div v-if="menu_birthdays()" class="col-6 text-center q-mb-md">
        <div>Community news</div>
        <q-icon class="text-primary" name="people_outline" size="6rem" />
      </div>
      <div class="col-6 text-center q-mb-md">
        <div>Sunday's readings</div>
        <router-link to="/sunday" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="book" size="6rem" />
        </router-link>
      </div>
      <div class="col-6 text-center q-mb-md">
        <div>Daily devotional</div>
        <router-link to="/ffdl" class="text-white" style="text-decoration:none;">
          <q-icon class="text-primary" name="games" size="6rem" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    if (!localStorage.getItem('JOURNEY_Society')) {
      this.$router.push({ name: 'settings' })
    } else {
      this.$store.commit('setSocietyName', localStorage.getItem('JOURNEY_Societyname'))
      this.$store.commit('setSocietyId', localStorage.getItem('JOURNEY_Society'))
      if (localStorage.getItem('JOURNEY_Circuit')) {
        this.$store.commit('setCircuitId', localStorage.getItem('JOURNEY_Circuit'))
        this.$store.commit('setCircuitName', localStorage.getItem('JOURNEY_Circuitname'))
      }
      this.$axios.get(this.$store.state.hostname + '/methodist/circuits/' + this.$store.state.circuitid + '/societies/' + this.$store.state.societyid + '/feeditems')
        .then(response => {
          this.$store.commit('setFeeditems', response.data)
          if (response.data.groups) {
            this.$store.commit('setGroups', true)
          } else {
            this.$store.commit('setGroups', false)
          }
          if (response.data.birthdays) {
            this.$store.commit('setBirthdays', true)
          } else {
            this.$store.commit('setBirthdays', false)
          }
          if (response.data.media) {
            this.$store.commit('setMedia', true)
          } else {
            this.$store.commit('setMedia', false)
          }
        })
        .catch(function (error) {
          console.log(error)
          // this.$q.loading.hide()
        })
    }
  },
  methods: {
    menu_media () {
      return this.$store.state.menu_media
    },
    menu_groups () {
      return this.$store.state.menu_groups
    },
    menu_birthdays () {
      return this.$store.state.menu_birthdays
    },
    menu_practice () {
      return this.$store.state.menu_practice
    }
  }
}
</script>

<style>
</style>
