<template>
  <div class="layout-padding">
    <div v-if="household.id" class="text-center q-mt-md">
      <p class="caption q-mt-md">{{household.addressee}} <q-icon class="cursor-pointer" @click.native="editHousehold" name="edit"></q-icon></p>
      <p class="text-left q-mx-md">
        <q-icon name="place" color="tertiary"></q-icon> {{household.addr1}} {{household.addr2}} {{household.addr3}}<br>
        <q-icon name="email" color="tertiary"></q-icon> {{household.post1}} {{household.post2}} {{household.post3}}<br>
        <q-icon name="phone" color="tertiary"></q-icon> {{household.homephone}}<br>
        Household SMS'es go to: {{householdcell}}
      </p>
      <q-tabs color="secondary" no-pane-border align="justify" class="q-mt-md">
        <q-tab v-for="(indiv, ndx) in household.individuals" :default="!ndx" :key="indiv.id" slot="title" :name="'tab' + indiv.id" :label="indiv.firstname"/>
        <q-tab-pane v-for="indiv in household.individuals" :key="indiv.id" :name="'tab' + indiv.id">
          <q-icon v-if="indiv.surname" name="person" color="primary"></q-icon> {{indiv.title}} {{indiv.firstname}} {{indiv.surname}}  <q-icon class="cursor-pointer" @click.native="editIndividual(indiv)" name="edit"></q-icon><br>
          <q-icon v-if="indiv.cellphone" name="phone" color="primary"></q-icon> {{indiv.cellphone}}<br>
          <q-icon v-if="indiv.email" name="email" color="primary"></q-icon> {{indiv.email}}<br>
          <q-icon v-if="indiv.birthdate" name="cake" color="primary"></q-icon> {{indiv.birthdate}}<br>
          <q-icon v-if="indiv.memberstatus" name="account_box" color="primary"></q-icon> {{indiv.memberstatus}}<br>
          <span v-if="indiv.giving > 0"><q-icon name="card_giftcard" color="primary"></q-icon> {{indiv.giving}}</span>
          <span v-else>
            <span v-if="indiv.memberstatus !== 'Child'">Sign up as a planned giver</span>
          </span>
          <br>
        </q-tab-pane>
        <q-tab key="0" slot="title" name="tabadd" icon="add_circle"/>
        <q-tab-pane name="tabadd">
          <q-btn @click.native="addIndividual()">Add a new member to this household</q-btn>
        </q-tab-pane>
      </q-tabs>
    </div>
    <div v-else-if="phone" class="text-justify q-mt-md">
      <p class="text-center caption">View / edit my details</p>
      <p>Your verified phone number is: <b>{{phone}}</b> but we don't have your other details in the <b>{{society}}</b> membership records.</p>
      <p>You can choose to either add your details or continue to use the app anonymously if you prefer. (Note that anonymous users can't use the messaging features).</p>
      <p class="text-center">
        <q-btn color="secondary" class="q-mr-md">Add my details</q-btn>
        <q-btn color="secondary">Back to home screen</q-btn>
      </p>
    </div>
    <div v-else class="text-center q-mt-md">
      <q-btn color="secondary" to="phoneverification">Verify your phone number</q-btn>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      household: {}
    }
  },
  mounted () {
    if (this.$store.state.individual.household) {
      this.household = this.$store.state.individual.household
    }
  },
  computed: {
    society () {
      return this.$store.state.societyname
    },
    phone () {
      return localStorage.getItem('JOURNEY_VerifiedPhone')
    },
    householdcell () {
      for (var ikey in this.household.individuals) {
        if (this.household.individuals[ikey].id === this.household.householdcell) {
          return this.household.individuals[ikey].firstname
        }
      }
    }
  },
  methods: {
    editHousehold () {
      this.$router.push({name: 'householdform', params: { id: this.$route.params.id, action: 'edit' }})
    },
    addIndividual () {
      this.$router.push({name: 'individualform', params: { individual: {}, action: 'add' }})
    },
    editIndividual (individual) {
      this.$router.push({name: 'individualform', params: { individual: individual, action: 'edit' }})
    }
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
