<template>
    <label for="add-img" class="btn btn-outline-secondary text-light p-5" @dragover.prevent="" @drop.prevent="drop">
        <img width="100" src="../assets/img/add_img.svg" alt="">
        <p class="mt-2">Clicca per caricare o trascina qui l'immagine. Formati supportati: .jpeg, .png, .gif,
            .svg.</p>
        <input class="d-none" type="file" id="add-img" @change="drop" />
    </label>
</template>

<script>
export default {
    props: ['drop'],
    data() {
        return {
        };
    },
    methods: {
    },
};
</script>
<style lang="scss" scoped></style>