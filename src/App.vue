<template>
  <CmpLoading v-if="store.loading.state" />
  <AppHeader />
  <main class="d-flex">
    <RouterView />
  </main>
  <AppFooter />
</template>

<script>
import { store } from './store.js';
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import CmpLoading from './components/CmpLoading.vue'
export default {
  components: { AppHeader, AppFooter, CmpLoading },
  data() {
    return {
      store,
    }
  },
  watch: {
    'store.user.isLogged'(newLog, oldLog) {
      if (newLog !== oldLog) {
        if (newLog) {
          if (this.$route.name === 'user') {
            this.$router.push({ name: 'home' });
          }
        }
      }
    }
  },
  mounted() {
    this.store.start();
    this.store.loading.on("Caricamento di un secondo");
    setTimeout(() => {
      this.store.loading.off();
    }, 1000);
  },
}

</script>

<style lang="scss">
/*
@use '../assets/scss/partials/_variables.scss' as *;
*/
</style>