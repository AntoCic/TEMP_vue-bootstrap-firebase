<template>
  <div class="container my-auto text-white">
    <div class="row">
      <div class="col-6">
        <a class="logo text-end" href="https://getbootstrap.com/docs/5.3/getting-started/introduction" target="_blank">
          <img src="../assets/img/bootstrap.svg" alt="logo Bootstrap">
        </a>
      </div>
      <div class="col-6">
        <a class="logo" href="https://vuejs.org/guide/quick-start.html" target="_blank">
          <img src="../assets/img/vue.svg" alt="logo Vue">
        </a>
      </div>
      <div class="col-12 text-center">
        <h1 class="bg-light text-dark px-4 py-2 rounded bg-opacity-75">Template Vue + Bootstrap + Firebase</h1>
        <button type="button" class="btn btn-outline-success" @click="count++">
          count: {{ count }}
        </button>
      </div>



      <div class="col-12 col-md-8 mx-auto">

        <div v-if="store.userJWT" class="border border-light rounded position-relative py-2 px-4 mt-2">
          <span class="position-absolute top-0 start-0 translate-middle">
            <img src="../assets/img/box.svg" alt="icona di un box di legno">
          </span>

          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="newItem" @keyup.enter="addItem" placeholder="items to add">
            <button class="btn btn-outline-success" type="button" @click="addItem">
              <span class="material-symbols-outlined">add</span>
            </button>
          </div>
          <template v-for="item in store.item.all" :key="item.id">
            <div class="input-group mb-1 mt-4">
              <input type="text" class="form-control" v-model="item.name">
              <button class="btn btn-outline-warning" type="button" @click="updateItem(item.id, item.name)">
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button class="btn btn-outline-danger" type="button" @click="deleteItem(item.id)">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>

            <CmpDropFile working="onUpload" @onUpload="uploadImg" :id="item.id" fileType="img" multiple />

            <div v-if="store.item.all[item.id]" class="mt-3 text-center">
              <div v-for="(image, imageKey) in store.item.all[item.id].files" :key="image.fileName"
                class="m-2 d-inline-block position-relative">
                <img :src="image.url" alt="Uploaded Image" class="d-inline-block" width="150" />
                <span type="button" @click="store.item.all[item.id].deleteFile(imageKey)"
                  class="position-absolute top-0 start-100 translate-middle btn btn-outline-danger p-0 rounded-circle d-flex justify-content-center align-items-center"
                  style="width: 25px; aspect-ratio: 1/1;">
                  x
                  <span class="visually-hidden">Delete image</span>
                </span>
              </div>
            </div>

          </template>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store';

import CmpDropFile from '../components/CmpDropFile.vue';
export default {
  components: { CmpDropFile },
  data() {
    return {
      store,
      count: 0,
      newItem: '',
    };
  },
  methods: {
    async addItem() {
      await this.store.item.add({ name: this.newItem });
      this.newItem = '';
    },

    async updateItem(id, newItem) {
      const updated = await this.store.item.all[id].update({ name: newItem });
      if (!updated) {
        console.error('Errore update item');
      }
    },

    async deleteItem(id) {
      const deleted = await this.store.item.all[id].delete();
      if (deleted) {
        delete this.store.item.all[deleted]
      } else {
        console.error('Errore delete item');
      }
    },

    async uploadImg(files, id) {
      await this.store.item.all[id].uploadFiles(files);
    },


  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: inline-block;
  width: 100%;

  img {
    width: 100%;
    max-width: 100px;
  }
}
</style>
