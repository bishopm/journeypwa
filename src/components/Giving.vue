<template>
  <div class="q-ma-md">
    <p class="caption text-center">Planned giving</p>
    <q-tabs v-model="selectedTab" color="primary" class="no-border" q-tabs-two-lines>
      <q-tab slot="title" name="adminGiving" key="admin">Admin</q-tab>
      <q-tab-pane name="adminGiving" class="no-border">
        <div class="q-ma-md text-center">
          <q-btn>Choose a planned giving number</q-btn>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedTab: 'adminGiving',
      society: 667
    }
  },
  mounted () {
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.post(process.env.API + '/giving',
      {
        id: this.$route.params.id,
        society: this.society
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

}
</script>

<style>
</style>
