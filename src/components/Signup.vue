<template>
  <div>
    <q-tabs v-model="selectedTab" active-color="white" indicator-color="primary" class="no-border bg-secondary text-primary" q-tabs-two-lines>
      <q-tab name="fGroups" key="fGroups">Fellowship groups</q-tab>
      <q-tab name="sGroups" key="sGroups">Service groups</q-tab>
    </q-tabs>
    <q-tab-panels v-model="selectedTab" animated class="q-ma-sm">
      <q-tab-panel key="fGroups" name="fGroups" class="no-border">
        <div v-if="!fgroups.length && !sgroups.length">
          <q-spinner-bars class="q-ml-sm" size="20px" />
        </div>
        <q-list v-if="fgroups.length">
          <q-item v-for="fgroup in fgroups" :key="fgroup.id" :to="'/groups/' + fgroup.id">
            {{fgroup.groupname}}
          </q-item>
        </q-list>
        <p v-else class="text-justify">No fellowship / home groups have been set up yet. When your administrator has done this, it will be possible to join groups or request information from here.</p>
      </q-tab-panel>
      <q-tab-panel key="sGroups" name="sGroups" class="no-border">
        <div v-if="!fgroups.length && !sgroups.length">
          <q-spinner-bars class="q-ml-sm" size="20px" />
        </div>
        <q-list v-if="sgroups.length">
          <q-item v-for="sgroup in sgroups" :key="sgroup.id" :to="'/groups/' + sgroup.id">
            {{sgroup.groupname}}
          </q-item>
        </q-list>
        <p v-else class="text-justify">No service teams have been set up yet. When your administrator has done this, it will be possible to join groups or request information from here.</p>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedTab: 'fGroups',
      fgroups: [],
      sgroups: []
    }
  },
  mounted () {
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.get(process.env.API + '/groupsignups/' + this.$store.state.societyid)
      .then(response => {
        this.fgroups = response.data.fellowship
        this.sgroups = response.data.service
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
.q-item{
  min-height: 0px;
  padding-bottom: 2px;
  padding-top: 2px;
}
</style>
