<template>
  <div class="q-ma-md">
    <div v-if="$route.params.action" class="bg-secondary q-mx-md q-mt-md text-center text-white q-py-md">
      {{$route.params.action.toUpperCase()}} INDIVIDUAL
    </div>
    <div class="q-ma-md">
      <q-input outlined hide-bottom-space error-message="Surname is required" label="Surname" v-model="form.surname" :rules="[ val => val.length >= 1 ]"/>
    </div>
    <div class="q-ma-md">
      <q-input outlined hide-bottom-space error-message="The firstname field is required" label="First name" v-model="form.firstname" :rules="[ val => val.length >= 1 ]" />
    </div>
    <div class="q-ma-md">
      <q-input outlined hide-bottom-space label="Email" error-message="Must be a valid email address" v-model="form.email"/>
    </div>
    <div class="q-ma-md">
      <q-input outlined hide-bottom-space error-message="Phone numbers must be numeric" label="Cellphone" v-model="form.cellphone" @blur="$v.form.cellphone.$touch()" :error="$v.form.cellphone.$error" />
    </div>
    <div class="q-ma-md">
      <q-select label="Sex" outlined v-model="form.sex" :options="[{ label: 'female', value: 'female' }, { label: 'male', value: 'male' }]" map-options emit-value/>
    </div>
    <div class="q-ma-md">
      <q-select label="Title" outlined v-model="form.title" :options="[{ label: 'Dr', value: 'Dr' }, { label: 'Mr', value: 'Mr' }, { label: 'Mrs', value: 'Mrs' }, { label: 'Ms', value: 'Ms' }, { label: 'Prof', value: 'Prof' }, { label: 'Rev', value: 'Rev' }]"/>
    </div>
    <div class="q-ma-md">
      <q-select label="Membership" outlined v-model="form.memberstatus" :options="[{ label: 'Child', value: 'child' }, { label: 'Member', value: 'member' }, { label: 'Non-member', value: 'non-member' }]"/>
    </div>
    <div class="q-ma-md">
      <q-input outlined label="Date of birth" v-model="form.birthdate" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="fa fa-calendar" class="cursor-pointer">
            <q-popup-proxy>
              <q-date v-model="form.birthdate" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="text-center" v-if="form.id">
      <div class="card-body">
        <img :src="profilepic" style="border-radius:50%" width="250"/>
        <div class="card-img-overlay">
          <q-btn color="primary" id="pick-avatar">{{buttontext}}</q-btn>
          <q-btn v-if="form.image" @click="removeImage" class="q-ml-md" color="negative">Delete image</q-btn>
        </div>
      </div>
      <div class="card-footer text-muted" v-html="message"></div>
      <avatar-cropper  :labels="{submit: 'OK', cancel: 'Cancel'}" @uploading="handleUploading" @uploaded="handleUploaded" @completed="handleCompleted" @error="handlerError" trigger="#pick-avatar" :upload-url="uploadurl" :upload-headers="uploadHeaders"/>
    </div>
    <div class="q-ma-md text-center">
      <q-btn color="primary" @click="submit">OK</q-btn>
      <q-btn class="q-ml-md" color="black" @click="$router.back()">Cancel</q-btn>
    </div>
  </div>
</template>

<script>
import { required, numeric, email } from 'vuelidate/lib/validators'
import AvatarCropper from 'vue-avatar-cropper'

export default {
  data () {
    return {
      form: {
        surname: '',
        firstname: '',
        birthdate: '',
        title: '',
        email: '',
        sex: 'female',
        memberstatus: '',
        cellphone: '',
        household_id: 0,
        id: '',
        image: ''
      },
      uploadurl: null,
      userAvatar: null,
      message: null,
      uploadHeaders: {
        'Authorization': 'Bearer ' + this.$store.state.token
      }
    }
  },
  computed: {
    profilepic () {
      if (this.form.image) {
        return process.env.WEB + '/vendor/bishopm/images/profile/' + this.form.image
      } else {
        return ''
      }
    },
    buttontext () {
      if (this.form.image) {
        return 'Change image'
      } else {
        return 'Add profile image'
      }
    }
  },
  validations: {
    form: {
      surname: { required },
      firstname: { required },
      email: { email },
      cellphone: { numeric }
    }
  },
  components: {
    AvatarCropper
  },
  methods: {
    removeImage () {
      this.form.image = ''
      this.$q.notify('Press OK to make this change permanent')
    },
    handleUploading (form, xhr) {
      this.message = 'uploading...'
    },
    handleUploaded (response) {
      if (response.status === 'success') {
        this.message = 'user avatar updated'
      }
    },
    handleCompleted (response, form, xhr) {
      this.message = 'upload completed'
      this.$store.commit('setIndividual', response)
      this.$router.push('/me')
    },
    handlerError (message, type, xhr) {
      this.message = 'Oops! Something went wrong...'
    },
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Please check for errors!')
      } else {
        if (this.form.birthdate) {
          this.form.birthdate = this.form.birthdate.slice(0, 10)
        }
        this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
        this.$axios.post(process.env.API + '/individual',
          {
            surname: this.form.surname,
            firstname: this.form.firstname,
            sex: this.form.sex,
            cellphone: this.form.cellphone,
            birthdate: this.form.birthdate,
            title: this.form.title,
            memberstatus: this.form.memberstatus,
            email: this.form.email,
            image: this.form.image,
            household_id: this.form.household_id,
            id: this.form.id
          })
          .then(response => {
            this.$q.notify('Database successfully updated')
            this.$router.push({ name: 'home' })
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
  },
  mounted () {
    if (!this.$store.state.individual.household) {
      this.$router.push({ name: 'home' })
    }
    if (this.$route.params.action === 'edit') {
      this.form = this.$route.params.individual
    } else {
      this.form.surname = this.$store.state.individual.household.sortsurname
      this.form.household_id = this.$store.state.individual.household_id
    }
    this.userAvatar = this.profilepic
    this.uploadurl = process.env.API + '/individuals/' + this.form.id + '/image'
  }
}
</script>

<style>
  a {
    text-decoration: none;
    color:white;
  }
  .flex {
    display: flex;
    flex-wrap: wrap;
  }
  .flex .lg {
    flex-basis: 0;
    flex-grow: 3;
    margin: 3px;
  }
  .flex .md {
    flex-basis: 0;
    margin: 3px;
    flex-grow: 2;
  }
  .basic {
    max-width: 700px;
    min-width: 270px;
  }
</style>
