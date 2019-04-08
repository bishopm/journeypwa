<template>
  <div class="q-ma-sm row">
    <div class="col-12 q-ma-sm"><q-input autofocus placeholder="Search for a member" @input="updateFilter" v-model="search" /></div>
    <div class="col-xs-4 col-sm-3 col-md-2 text-center q-pa-sm box" v-for="member in filteredMembers" :key="member.id">
      <img style="border-radius: 10%;" width="100%" :src="url + member.image"><br>
      <span class="caption"><small>{{member.firstname}} {{member.surname}}</small></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      members: [],
      filteredMembers: [],
      search: '',
      url: ''
    }
  },
  methods: {
    updateFilter () {
      if (this.search === '') {
        this.filteredMembers = this.members
      } else {
        this.filteredMembers = []
        for (var fndx in this.members) {
          if ((this.members[fndx].surname.toLowerCase().includes(this.search.toLowerCase())) || (this.members[fndx].firstname.toLowerCase().includes(this.search.toLowerCase()))) {
            this.filteredMembers.push(this.members[fndx])
          }
        }
      }
    }
  },
  mounted () {
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.get(process.env.API + '/individuals/church/' + this.$store.state.societyid)
      .then(response => {
        this.url = process.env.WEB + '/vendor/bishopm/images/profile/'
        this.members = response.data
        this.filteredMembers = this.members
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
p {
  margin-bottom: 0px;
}
.caption {
  line-height: 0px;
}
</style>
