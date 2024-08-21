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
          <button v-if="user.accessToken" @click="user.logout" class="btn btn-outline-danger border-0 px-1 me-1">
            <span v-if="user.userName" class="me-1">{{ user.userName }}</span>
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
import { user } from '../../user.js';
export default {
  data() {
    return {
      user,
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