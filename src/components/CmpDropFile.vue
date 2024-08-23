<!-- 
# Modalità di Utilizzo
> **Nota:** L'attributo `id` deve essere specificato, il valore deve essere univoco.
## Il componente può essere utilizzato in due modalità, specificate tramite l'attributo `working`:

- `onUpload`: Emette una funzione al momento dell'upload dei file.
```html
<CmpDropFile working="onUpload" @onUpload="(files) => {console.log(files);}" :id="item.id"
    fileType="img" multiple />
```

- `onClickUpload`: Emette una funzione al click del pulsante che viene creato.
```html
<CmpDropFile working="onClickUpload" @onClickUpload="(files) => {console.log(files);}" :id="item.id" 
    fileType="img" multiple />
```

## Tipi di File Supportati
L'attributo `fileType` definisce i tipi di file accettati dal componente. I valori possibili sono:

- `img`: `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`
- `txt`: `.txt`
- `pdf`: `.pdf`
- `doc`: `.doc`, `.docx`
- `xlsx`: `.xlsx`
- `csv`: `.csv`
- `all`: Accetta tutti i formati elencati sopra

> **Nota:** Se l'attributo `fileType` non viene specificato, il valore predefinito sarà `all`.

## Caricamento Multiplo di File
Se viene aggiunto l'attributo `multiple`, sarà possibile caricare più file contemporaneamente.
-->

<template>
    <label :for="id" ref="btnDrop" :class="[`btn btn-outline-${btn} p-5`, isOnClickUpload ? 'rounded-top' : '']"
        @dragover.prevent="dragover" @dragleave="dragleave" @drop.prevent="loadFile">

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

        <input class="d-none" type="file" :id="id" @change="loadFile" :accept="extensions[fileType]"
            :multiple="multiple" />
    </label>


    <button v-if="isOnClickUpload" class="btn btn-outline-success m-0 w-100 rounded-bottom " @click="emitUpload">
        Carica File
    </button>
</template>

<script>
export default {
    emits: ['onUpload', 'onClickUpload'],
    props: {
        working: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
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
        },
        path: {
            type: String,
            default: ''
        },

    },
    data() {
        return {
            files: [],
            url: [],
            isOnClickUpload: false,
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
        loadFile(e) {
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
            if (!this.isOnClickUpload) {
                this.$emit('onUpload', this.files, this.id);
                this.reset();
            }
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
            this.$emit('onClickUpload', this.files, this.id);
            this.reset()
        }
    },
    mounted() {
        if (!['onUpload', 'onClickUpload'].includes(this.working)) {
            console.error('working deve essere onUpload oppure onClickUpload');
        } else {
            if (this.working === 'onClickUpload') {
                this.isOnClickUpload = true
            }
        }
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
