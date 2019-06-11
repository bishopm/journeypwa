<template>
  <div class="q-mx-md">
    <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">{{group.groupname}}</p>
    <p v-if="group.description" class="text-grey">{{group.description}}</p>
    <p>Contact person: {{leader}}</p>
    <q-separator v-if="members.length" class="q-mb-md"/>
    <span v-for="(member, index) in members" :key="member.id">
      {{member.firstname}} {{member.surname}}<template v-if="index !== members.length - 1">, </template>
    </span>
    <div class="text-center q-mt-md">
      <p v-if="alreadyamember"><b>You are a member of this {{grouptype}}</b></p>
      <q-btn v-else @click="signmeup">I'd like to join this {{grouptype}}</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      group: {},
      members: [],
      alreadyamember: false,
      grouptype: 'group',
      leader: ''
    }
  },
  methods: {
    signmeup () {
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.post(process.env.API + '/groupsignupmessage',
        {
          group: this.group.id,
          person: this.$store.state.individual.id
        })
        .then((response) => {
          this.$q.notify('Thanks for your interest - we have sent a message to the group contact person who will get in touch with you')
        })
        .catch(error => {
          if (error.code === 'ECONNABORTED') {
            this.$q.notify('Server connection timed out - are you offline?')
          } else {
            console.log(error)
          }
        })
    }
  },
  mounted () {
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.get(process.env.API + '/groups/' + this.$route.params.id)
      .then((response) => {
        this.group = response.data.group
        if (this.group.grouptype === 'service') {
          this.grouptype = 'team'
        }
        this.members = response.data.members
        for (var mndx in this.members) {
          if (this.members[mndx].id === this.$store.state.individual.id) {
            this.alreadyamember = true
          }
          if (this.members[mndx].id === this.group.leader) {
            this.leader = this.members[mndx].firstname + ' ' + this.members[mndx].surname
          }
        }
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
