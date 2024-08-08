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
          <!-- <button class="btn btn-outline-light border-0 px-1 me-1">
            <span class="material-symbols-outlined">
              person
            </span>
          </button> -->
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
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