<template>
    <label for="add-img" ref="btnDrop" :class="[`btn btn-outline-${btn} p-5`, uploadBtn ? 'rounded-top' : '']"
        @dragover.prevent="dragover" @dragleave="dragleave" @drop.prevent="sendFile">

        <img v-if="files.length === 0" width="100" src="../assets/img/add_img.svg" alt="">

        <div v-else>
            <button class="btn btn-outline-danger" v-for="(file, index) in files"
                :key="`${file.lastModified}_${file.name}`" @click.stop.prevent="deleteFile(index)">
                <img v-if="fileType === 'img'" width="100" :src="url[index]" alt="">
                <br>
                {{ file.name }}
            </button>
        </div>

        <p class="mt-2">
            Clicca per caricare o trascina qui l'immagine. Formati supportati: {{ extensions[fileType] }}
        </p>

        <input class="d-none" type="file" id="add-img" @change="sendFile" :accept="extensions[fileType]"
            :multiple="multiple" />
    </label>

    <button v-if="uploadBtn" class="btn btn-outline-success m-0 w-100 rounded-bottom " @click="emitUpload">
        Carica File
    </button>
</template>

<script>
export default {
    emits: ['getImg', 'uploadBtn'],
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
        path: {
            type: String,
            default: ''
        },
        uploadBtn: {
            type: Boolean,
        },
    },
    data() {
        return {
            files: [],
            url: [],
            extensions: {
                'img': '.jpg,.jpeg,.png,.gif,.svg',
                'txt': '.txt',
                'pdf': '.pdf',
                'doc': '.doc,.docx',
                'xlsx': '.xlsx',
                'csv': '.csv',
                'all': '.jpg,.jpeg,.png,.gif,.svg,.txt,.pdf,.doc,.docx,.xlsx,.csv'
            },
        };
    },
    methods: {
        sendFile(e) {
            this.$refs.btnDrop.classList.remove('dragging');

            const newFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
            if (newFiles) {
                this.files = [...this.files, ...newFiles];
                for (const file of newFiles) {
                    if (this.fileType === 'img') {
                        this.url.push(URL.createObjectURL(file));
                    } else {
                        this.url.push(null);
                    }
                }
            }

            this.$emit('getImg', this.files);
        },
        dragover() {
            this.$refs.btnDrop.classList.add('dragging');
        },
        dragleave() {
            this.$refs.btnDrop.classList.remove('dragging');
        },

        deleteFile(index) {
            this.files.splice(index, 1);
            this.url.splice(index, 1);
        },

        reset() {
            this.files = [];
            this.url = [];
        },


        emitUpload() {
            this.reset()
            this.$emit('uploadBtn', this.files);
        }
    },
    mounted() {
    }
};
</script>

<style lang="scss" scoped>
.dragging {
    border: 2px dashed #00f;
    color: #8CBCC8;
    background-color: #f0f8ff;
}

.rounded-top {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

.rounded-bottom {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
}
</style>
