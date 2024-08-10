<template>
  <header>
    <div class="container">
      <nav class="row align-items-center my-1">
        <div class="col">
          <RouterLink to="/">
            <img src="/img/logo.png" class="logo align-text-top" alt="Vue logo" />
          </RouterLink>
        </div>
        <div class="col-auto">
          <button v-if="store.user.isLogged" @click="store.user.logout"
            class="btn btn-outline-danger border-0 px-1 me-1">
            <span v-if="store.user.userName" class="me-1">{{ store.user.userName }}</span>
            <span class="material-symbols-outlined align-top">
              logout
            </span>
          </button>

          <RouterLink to="/user" v-else>
            <button class="btn btn-outline-light border-0 px-1 me-1">
              <span class="material-symbols-outlined">
                account_circle
              </span>
            </button>
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { store } from '../../store.js'
export default {
  data() {
    return {
      store,
    }
  },
  mounted() {
  }
}

</script>


<style lang="scss" scoped>
.logo {
  height: 6em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #41B883);
}
</style>