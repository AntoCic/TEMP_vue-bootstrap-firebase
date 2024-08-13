<template>
    <label for="add-img" ref="btnDrop" :class="`btn btn-outline-${btn} p-5`" @dragover.prevent="dragover"
        @dragleave="dragleave" @drop.prevent="sendFile">
        <img width="100" src="../assets/img/add_img.svg" alt="">
        <p class="mt-2">Clicca per caricare o trascina qui l'immagine. Formati supportati: .jpeg, .png, .gif,
            .svg.</p>
        <input class="d-none" type="file" id="add-img" @change="sendFile" :accept="getExtension(fileType)"
            :multiple="multiple" />
    </label>
</template>

<script>
export default {
    props: {
        fileType: {
            type: String,
            default: 'all'
        },
        btn: {
            type: String,
            default: 'secondary'
        },
        multiple: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
        };
    },
    methods: {
        sendFile(e) {
            this.$refs.btnDrop.classList.remove('dragging');
            const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
            if (files && files[0]) {
                this.$emit('getImg', files[0]);
            }
        },
        dragover() {
            this.$refs.btnDrop.classList.add('dragging');
        },
        dragleave() {
            this.$refs.btnDrop.classList.remove('dragging');
        },
        getExtension(fileType) {
            switch (fileType) {
                case 'img':
                    return '.jpg,.jpeg,.png,.gif,.svg'
                default:
                    return '*/*'
            }
        }
    },
};
</script>
<style lang="scss" scoped>
.dragging {
    border: 2px dashed #00f;
    color: #8CBCC8;
    background-color: #f0f8ff;
}
</style>