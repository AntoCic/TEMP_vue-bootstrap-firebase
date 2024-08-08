<template>
  <div class="container my-auto">
    <div class="card bg-transparent my-3">
      <div class="row g-0 bg-light bg-opacity-25 border-0 rounded">
        <div class="col-md-8">
          <div class="card-body text-white">
            <p class="card-text">Nome cognome: {{ name }}</p>
            <p class="card-text">Email: <a :href="'mailto:' + email">{{ email }}</a></p>
            <p class="card-text">Telefono: <a :href="'tel:' + phone">{{ phone }}</a></p>
            <p class="card-text">WebSite Portfolio: <a :href="WebSite" target="_blank">/portfolio-antocic</a></p>
            <p class="card-text">Linkedin: <a :href="linkedin_link" target="_blank">/Antonino-Cicala</a></p>
            <p class="card-text">Github: <a :href="git_link" target="_blank">/AntoCic</a></p>
          </div>
        </div>
        <div class="col-md-4">
          <img src="/img/foto_profilo.png" class="img-fluid rounded object-fit-cover h-100"
            alt="foto profilo personale">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Antonino Cicala',
      email: 'anto.cic.127@gmail.com',
      phone: '+39 3295436315',
      WebSite: 'https://portfolio-antocic.netlify.app',
      linkedin_link: 'https://www.linkedin.com/in/antonino-cicala/',
      git_link: 'https://github.com/AntoCic'
    }
  },
}
</script>

<style lang="scss" scoped>
a {
  color: #69b3f3;
}
</style>