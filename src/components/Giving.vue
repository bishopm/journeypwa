<template>
  <div class="q-ma-md">
    <p class="q-my-md header text-center bg-secondary q-pa-sm text-white text-bold">Planned giving <small>{{name}}</small></p>
    <div v-if="!errormessage">
      <q-tabs v-model="selectedTab" color="primary" class="no-border" q-tabs-two-lines>
        <q-tab name="aboutGiving" key="about">About</q-tab>
        <q-tab name="adminGiving" key="admin">Admin</q-tab>
      </q-tabs>
      <q-tab-panels v-model="selectedTab" class="q-mt-md">
        <q-tab-panel name="adminGiving" class="no-border">
          <div class="q-mt-sm text-center">
            <div v-if="pg > 0">
              <q-table :title="'Planned Giving History - PG:' + pg" v-if="$route.params.id === $store.state.individual.id && pg > 0" :pagination.sync="pagination" :data="rows" :columns="columns" row-key="name" no-data-label="No payments have been captured yet"/>
              <p v-else>This family member has a different planned giving number. You may only view records linked to your PG number</p>
            </div>
            <div v-else>
              You don't have a planned giving number yet. Start by clicking the button below and choosing a number. Or click the ABOUT tab above and read more about our planned giving programme.
              <q-btn class="q-mt-md" label="Choose a planned giving number" color="primary" @click="modalopen = true" />
            </div>
            <q-dialog v-model="modalopen" transition-show="scale" transition-hide="scale">
              <q-card class="" style="width: 300px">
                <q-card-section>
                  <div class="text-h6">Choose a PG number</div>
                  <div v-if="householdpg.length !== null && householdpg.length !== 0">
                    <small>The following members of your household already have PG numbers:</small>
                    <div class="q-mt-sm text-center" v-for="(kk,vv) of householdpg" :key="kk"><small><b>{{kk}} ({{vv}})</b></small></div>
                    <div class="q-mt-sm text-justify"><small>You may choose either an existing household number or a new number from the list below</small></div>
                  </div>
                  <q-select label="Choose a number" v-model="newnumber" :options="pgs"/>
                  <div class="text-center">
                    <q-btn class="q-mt-md" color="primary" @click="savechanges()" label="OK" />
                    <q-btn class="q-mt-md q-ml-md" color="black" @click="modalopen = false" label="Cancel" />
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </q-tab-panel>
        <q-tab-panel name="aboutGiving" class="no-border">
          <p class="text-justify">
            For someone who never asked anyone for money, Jesus had a great deal to say about the subject! In the New Testament, Jesus speaks more about money and possessions than any other topic except for the Kingdom of God. Why? Because how we deal with money reveals a great deal about our hearts and about who we really worship (Lk 16:13).
          </p>
          <p class="text-justify">
            To help our members to give consistently to God's work, we have an anonymous planned giving system. Here's how it works:
            <ul>
              <li>Every member (or family) is allocated a Planned Giving (PG) number</li>
              <li>You may choose to give via EFT (using that number as a reference: eg - PG 999) or by placing an envelope in the offering bag marked with that number</li>
              <li>Our bookkeeper captures amounts received and records the appropriate PG number. We do not track giving by name.</li>
              <li>Our system will automatically send you an email each quarter listing the amounts recorded - this is helpful to keep track of your own giving and to ensure that the money has actually been received.</li>
              <li>You can also see your giving history at any time in the ADMIN tab of this page in the Journey App.</li>
            </ul>
          </p>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div v-else class="text-center">{{errormessage}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedTab: 'adminGiving',
      modalopen: false,
      householdpg: [],
      householdids: [],
      errormessage: null,
      columns: [
        { name: 'date', required: true, label: 'Date', align: 'left', field: 'paymentdate', sortable: true },
        { name: 'amt', required: true, label: 'Amount', align: 'right', field: 'amount', sortable: true }
      ],
      newnumber: '',
      name: '',
      rows: [],
      pg: false,
      pgs: [],
      pagination: {
        rowsPerPage: 10
      }
    }
  },
  methods: {
    savechanges () {
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.post(process.env.API + '/updategiving',
        {
          id: this.$route.params.id,
          pgnumber: this.newnumber
        })
        .then(response => {
          this.modalopen = false
          this.pg = this.newnumber
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    if (!this.$store.state.individual.household) {
      this.$store.commit('setIndividual', JSON.parse(localStorage.getItem('JOURNEY_Individual')))
    }
    this.householdids = []
    for (var indx in this.$store.state.individual.household.individuals) {
      this.householdids.push(this.$store.state.individual.household.individuals[indx].id)
    }
    console.log(this.householdids.indexOf(this.$route.params.id))
    if (this.householdids.indexOf(this.$route.params.id) > -1) {
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JOURNEY_Token')
      this.$axios.post(process.env.API + '/giving',
        {
          id: this.$route.params.id,
          society: this.$store.state.individual.household.society_id
        })
        .then(response => {
          if (response.data.pg !== '0') {
            this.pg = response.data.pg
          }
          this.name = response.data.name
          this.householdpg = response.data.householdpg
          for (var pndx in response.data.history) {
            var newitem = {
              paymentdate: response.data.history[pndx].paymentdate,
              amount: response.data.history[pndx].amount
            }
            this.rows.push(newitem)
          }
          for (var endx in response.data.householdpg) {
            var newt1 = {
              label: endx + ' (' + response.data.householdpg[endx] + ')',
              value: endx
            }
            this.pgs.push(newt1)
          }
          for (var gndx in response.data.available) {
            var newt = {
              label: String(response.data.available[gndx]),
              value: response.data.available[gndx]
            }
            this.pgs.push(newt)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      this.errormessage = 'Sorry, this person is not a member of your household!'
    }
  }

}
</script>

<style>
</style>
