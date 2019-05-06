<template>
  <div class="q-ma-sm">
    <div v-if="household.id" class="text-center q-mt-md">
      <p class="caption q-mt-md">{{household.addressee}} <q-btn color="primary" round size="sm" @click.native="editHousehold">edit</q-btn></p>
      <p class="text-center q-mx-md">
        <q-icon name="fas fa-fw fa-map-marker-alt" color="tertiary"></q-icon> {{household.addr1}} {{household.addr2}} {{household.addr3}}<br>
        <q-icon name="fas fa-fw fa-envelope" color="tertiary"></q-icon> {{household.post1}} {{household.post2}} {{household.post3}}<br>
        <q-icon name="fas fa-fw fa-phone" color="tertiary"></q-icon> {{household.homephone}}<br>
        Household SMS'es go to: {{householdcell}}
      </p>
      <q-tabs v-model="tab" dense active-bg-color="secondary" no-pane-border align="justify" class="q-mt-md bg-primary text-white" indicator-color="secondary">
        <q-tab v-for="indiv in household.individuals" :key="indiv.id" :name="'tab' + indiv.id" :label="indiv.firstname"/>
        <q-tab key="0" name="tabadd" icon="fas fa-fw fa-plus-circle"/>
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel v-for="indiv in household.individuals" :key="indiv.id" :name="'tab' + indiv.id">
          <q-card>
            <div class="row items-center q-mx-md">
              <div>
                <img v-if="indiv.image" style="border-radius:50%" width="100px" :src="url + 'profile/' + indiv.image">
                <img v-else class="img-rounded" width="100px" :src="url + 'journeyface.png'">
              </div>
              <div class="text-left q-ml-lg q-my-sm">
                <q-icon v-if="indiv.surname" name="fas fa-fw fa-user" color="primary" class="q-mr-sm"/><b>{{indiv.title}} {{indiv.firstname}} {{indiv.surname}}</b>&nbsp;<q-btn color="primary" round size="sm" @click.native="editIndividual(indiv)">edit</q-btn><br>
                <q-icon v-if="indiv.cellphone" name="fas fa-fw fa-mobile-alt" color="primary" class="q-mr-sm"/>{{indiv.cellphone}}<br>
                <q-icon v-if="indiv.email" name="fas fa-fw fa-envelope" color="primary" class="q-mr-sm"/>{{indiv.email}}<br>
                <q-icon v-if="indiv.birthdate" name="fas fa-fw fa-birthday-cake" color="primary" class="q-mr-sm"/>{{indiv.birthdate}}<br>
                <q-icon v-if="indiv.memberstatus" name="fas fa-fw fa-check-square" color="primary" class="q-mr-sm"/>{{indiv.memberstatus}}<br>
                <span v-if="indiv.memberstatus !== 'child'">
                  <q-btn class="q-my-sm" @click.native="giver(indiv.id)">Planned Giving</q-btn>
                </span>
              </div>
            </div>
          </q-card>
        </q-tab-panel>
        <q-tab-panel name="tabadd">
          <q-btn class="q-mt-lg" @click.native="addIndividual()">Add a new member to this household</q-btn>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div v-else-if="phone" class="text-justify q-mt-md">
      <p class="text-center caption">View / edit my details</p>
      <p>Your verified phone number is: <b>{{phone}}</b> but we don't have your other details in the <b>{{society}}</b> membership records.</p>
      <p class="text-center">
        <q-btn color="secondary" class="q-mr-md" @click.native="addUser()">Add my details</q-btn>
      </p>
    </div>
    <div v-else class="text-center q-mt-md">
      <q-btn color="secondary" to="phoneverification">Please verify your phone number</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      household: {},
      url: '',
      tab: ''
    }
  },
  mounted () {
    this.url = process.env.WEB + '/vendor/bishopm/images/'
    if (!this.$store.state.individual.household) {
      this.$store.commit('setIndividual', JSON.parse(localStorage.getItem('JOURNEY_Individual')))
    }
    this.household = this.$store.state.individual.household
    this.tab = 'tab' + this.$store.state.individual.id
  },
  computed: {
    society () {
      return this.$store.state.societyname
    },
    phone () {
      return localStorage.getItem('JOURNEY_VerifiedPhone')
    },
    householdcell () {
      var hname = 'None'
      for (var ikey in this.household.individuals) {
        if (this.household.individuals[ikey].id === this.household.householdcell) {
          hname = this.household.individuals[ikey].firstname
        }
      }
      return hname
    }
  },
  methods: {
    addUser () {
      this.$router.push({ name: 'combined' })
    },
    giver (id) {
      this.$router.push({ name: 'giving', params: { id: id } })
    },
    editHousehold () {
      this.$router.push({ name: 'householdform', params: { id: this.$route.params.id, action: 'edit' } })
    },
    addIndividual () {
      this.$router.push({ name: 'individualform', params: { individual: {}, action: 'add' } })
    },
    editIndividual (individual) {
      this.$router.push({ name: 'individualform', params: { individual: individual, action: 'edit' } })
    }
  }
}
</script>

<style>
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
.q-tab-panel {
  padding-top: 0px;
  padding-left: 2px;
  padding-right: 2px;

}
</style>
