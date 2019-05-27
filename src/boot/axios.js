import axios from 'axios'

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios.create({
    timeout: 15000
  })
}
