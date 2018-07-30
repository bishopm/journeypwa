<template>
  <div class="layout-padding">
    <p class="text-center caption">{{individual.firstname}} {{individual.surname}}</p>
    <p class="text-center"><q-icon name="phone"/> {{individual.cellphone}}</p>
    <p class="text-center"><q-icon name="email"/> {{individual.email}}</p>
    <p class="text-center"><q-icon name="cake"/> {{individual.birthdate}}</p>
    <p class="text-center caption q-mt-md">Groups</p>
    <span v-for="group in individual.groups" :key="group.id" v-if="group.publish">{{group.groupname}}, </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      individual: this.$store.state.individual
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
