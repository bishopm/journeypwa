<template>
  <div class="q-ma-md">
    <p class="caption text-center">Planned giving <small>{{name}}</small></p>
    <q-tabs v-model="selectedTab" color="primary" class="no-border" q-tabs-two-lines>
      <q-tab slot="title" name="adminGiving" key="admin">Admin</q-tab>
      <q-tab-pane name="adminGiving" class="no-border">
        <div class="q-ma-md text-center">
          <div v-if="pg > 0">
            <q-table :title="'Planned Giving History - PG:' + pg" v-if="$route.params.id === $store.state.individual.id && pg > 0" :pagination.sync="pagination" :data="rows" :columns="columns" row-key="name" no-data-label="No payments have been captured yet"/>
          </div>
          <q-btn v-else @click="modalopen = true">Choose a planned giving number</q-btn>
        </div>
      </q-tab-pane>
      <q-tab slot="title" name="aboutGiving" key="about">About</q-tab>
      <q-tab-pane name="aboutGiving" class="no-border">
        <p class="text-justify">
          For someone who never asked anyone for money, Jesus had a great deal to say about the subject! In the New Testament, Jesus speaks more about money and possessions than any other topic except for the Kingdom of God. Why? Because how we deal with money reveals a great deal about our hearts and about who we really worship (Lk 16:13)
        </p>
        <p class="text-justify">
          To help our members to give consistently to God's work, we have an anonymous planned giving system. Here's how it works:
          <ul>
            <li>Every member (or family) is allocated a Planned Giving (PG) number</li>
            <li>You may choose to give via EFT (using that number as a reference: eg - PG 999) or by placing an envelope in the offering bag marked with that number</li>
            <li>Our bookkeeper captures amounts received and records the appropriate PG number. We do not track giving by name.</li>
            <li>Our system will automatically send you an email each quarter listing the amounts recorded - this is helpful to keep track of your own giving and to ensure that the money has actually been received.</li>
          </ul>
        </p>
      </q-tab-pane>
    </q-tabs>
    <q-modal minimized v-model="modalopen" content-css="padding: 50px">
      <h4 class="text-center">Choose a PG number</h4>
      <div v-if="householdpg.length !== null && householdpg.length !== 0">
        <small>The following members of your household already have PG numbers:</small>
        <div class="q-mt-sm text-center" v-for="(kk,vv) of householdpg" :key="kk"><small><b>{{kk}} ({{vv}})</b></small></div>
        <div class="q-mt-sm text-justify"><small>You may choose either an existing household number or a new number from the list below</small></div>
      </div>
      <q-select float-label="Choose a number" v-model="newnumber" :options="pgs"/>
      <div class="text-center">
        <q-btn class="q-mt-md" color="primary" @click="savechanges()" label="OK" />
        <q-btn class="q-mt-md q-ml-md" color="black" @click="modalopen = false" label="Cancel" />
      </div>
    </q-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedTab: 'adminGiving',
      modalopen: false,
      householdpg: [],
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
  }

}
</script>

<style>
</style>
