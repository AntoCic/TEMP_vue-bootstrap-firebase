<template>
  <div class="container my-auto">
    <div class="row justify-content-center p-3">
      <div class="col col-md-8 col-lg-6 col-xl-4 p-3">
        <CmpFlipCard :state="isRegistering">
          <template v-slot:front>
            <h1 class="text-center mb-3">Login</h1>
            <BtnGoogleSignIn @click="store.user.googleLogin" />

            <hr class="text-secondary">

            <div class="mb-2">
              <label for="email" class="form-label mb-0">Email</label>
              <div class="input-google-icon">
                <label for="email" class="material-symbols-outlined icon">
                  alternate_email
                </label>
                <input type="email" :class="['form-control', validate.check({ email, type: 'email', form: 'login' })]"
                  id="email" v-model="email" placeholder="Enter your Email">

              </div>
            </div>

            <div class="mb-2">
              <label for="password" class="form-label mb-0">Password</label>
              <div class="input-google-icon d-flex align-items-center">
                <label for="password" class="material-symbols-outlined icon">
                  lock
                </label>
                <input :type="password_visibility ? 'text' : 'password'"
                  :class="['form-control', validate.check({ password, type: 'password', form: 'login' })]" id="password"
                  v-model="password" placeholder="Enter your Password">

                <label v-if="password_visibility" for="password_visibility" class="material-symbols-outlined ps-1">
                  visibility
                </label>
                <label v-else for="password_visibility" class="material-symbols-outlined ps-1">
                  visibility_off
                </label>
                <input type="checkbox" class="d-none" v-model="password_visibility" id="password_visibility">
              </div>
              <p class="mb-0 text-end"><a type="button" class="text-primary small"
                  @click="store.user.resetPassword(email)">Forgot password?</a></p>
            </div>

            <div class="text-center">
              <button class="btn btn-dark w-100" @click="login">Sign in</button>
              <p class="my-2">Non hai un account? <a type="button" class="text-primary" @click="flipCard">Registrati</a>
              </p>
            </div>
          </template>
          <template v-slot:back>
            <h1 class="text-center mb-3">Registrati</h1>

            <BtnGoogleSignIn @click="store.user.googleLogin" />

            <hr class="text-secondary">

            <div class="mb-2">
              <label for="registerUserName" class="form-label mb-0">Name</label>
              <div class="input-google-icon">
                <label for="registerUserName" class="material-symbols-outlined icon">
                  person
                </label>
                <input type="text"
                  :class="['form-control', validate.check({ registerUserName, type: 'string', query: [3, 10], form: 'register' })]"
                  id="registerUserName" v-model="registerUserName" placeholder="Enter your Name">
              </div>
              <p :class="validate.showError('registerUserName')"> ciao mondo </p>
            </div>

            <div class="mb-2">
              <label for="registerEmail" class="form-label mb-0">Email</label>
              <div class="input-google-icon">
                <label for="registerEmail" class="material-symbols-outlined icon">
                  alternate_email
                </label>
                <input type="email"
                  :class="['form-control', validate.check({ registerEmail, type: 'email', query: [3, 10], form: 'register' })]"
                  id="registerEmail" v-model="registerEmail" placeholder="Enter your Email">

              </div>
            </div>

            <div class="mb-1">
              <label for="registerPassword" class="form-label mb-0">Password</label>
              <div class="input-google-icon d-flex align-items-center">
                <label for="registerPassword" class="material-symbols-outlined icon">
                  lock
                </label>

                <input :type="password_visibility ? 'text' : 'password'"
                  :class="['form-control', validate.check({ registerPassword, type: 'password', form: 'register' })]"
                  id="registerPassword" v-model="registerPassword" placeholder="Enter your Password">

                <label v-if="password_visibility" for="registerPassword_visibility"
                  class="material-symbols-outlined ps-1">
                  visibility
                </label>
                <label v-else for="registerPassword_visibility" class="material-symbols-outlined ps-1">
                  visibility_off
                </label>
                <input type="checkbox" class="d-none" v-model="password_visibility" id="registerPassword_visibility">

              </div>
            </div>

            <div class="mb-3">
              <label for="registerRetypePassword" class="form-label mb-0">Ripeti password</label>
              <div class="input-google-icon d-flex align-items-center">

                <label for="registerRetypePassword" class="material-symbols-outlined icon">
                  lock
                </label>
                <input :type="password_visibility ? 'text' : 'password'"
                  :class="['form-control', validate.check({ registerRetypePassword, type: 'retype-password', query: registerPassword, form: 'register' })]"
                  id="registerRetypePassword" v-model="registerRetypePassword" placeholder="Enter your Password">

                <label v-if="password_visibility" for="registerRetypePassword_visibility"
                  class="material-symbols-outlined ps-1">
                  visibility
                </label>
                <label v-else for="registerRetypePassword_visibility" class="material-symbols-outlined ps-1">
                  visibility_off
                </label>
                <input type="checkbox" class="d-none" v-model="password_visibility"
                  id="registerRetypePassword_visibility">

              </div>
            </div>

            <div class="text-center">
              <button class="btn btn-dark w-100" @click="register">Sign up</button>
              <p class="my-2">Hai già un account? <a type="button" class="text-primary" @click="flipCard">Login</a></p>
            </div>
          </template>
        </CmpFlipCard>

      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js'
import validate from '../personal_modules/validate.js';
import BtnGoogleSignIn from '../components/BtnGoogleSignIn.vue'
import CmpFlipCard from '../components/CmpFlipCard.vue';
export default {
  components: { BtnGoogleSignIn, CmpFlipCard },
  data() {
    return {
      store,
      validate,
      isRegistering: false,
      email: '',
      password: '',
      registerUserName: '',
      registerEmail: '',
      registerPassword: '',
      registerRetypePassword: '',
      user: null,
      password_visibility: false,
    };
  },
  methods: {
    async login() {
      const isRegistered = await store.user.login(this.email, this.password)
      if (isRegistered) {
        this.email = '';
        this.password = '';
        this.password_visibility = false
      } else {
        this.password_visibility = false
        console.log('fuijhewuihfuihbwqueihuiferuiwhebfnjhbwejhbfjhbghwiuebiuf');
      }
    },
    // 
    async register() {
      if (this.validate.isAllValidated()) {
        const isRegistered = await store.user.register(this.registerUserName, this.registerEmail, this.registerPassword);
        if (isRegistered) {
          this.isRegistering = false;
          this.registerUserName = '';
          this.registerEmail = '';
          this.registerPassword = '';
        } else {
          this.password_visibility = false
          console.log('fuijhewuihfuihbwqueihuiferuiwhebfnjhbwejhbfjhbghwiuebiuf');
        }
      } else {
        alert('Per favore, completa tutti i campi correttamente.');
      }
    },

    flipCard() {
      this.password_visibility = false
      this.isRegistering = !this.isRegistering
      if (this.isRegistering) {
        this.validate.init('register')
      } else {
        this.validate.init('login')
      }
    },

  },
  created() {
    this.validate.init('login')
  }
};
</script>

<style lang="scss" scoped></style>
