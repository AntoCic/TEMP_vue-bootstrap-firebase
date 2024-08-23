// firebase.js
import axios from "axios";
import { user } from "../user";

export default class FIREBASE {
    static async parse(res) {
        return res;
    }

    static getAuth() {
        const token = user.accessToken;
        if (!token) {
            console.error('No access token available.');
            return {};
        }
        return token;
    }

    static async get() {
        return await axios.post('/api/g/' + this.mainPaths, {}, {
            headers: {
                "Authorization": this.getAuth()
            }
        })
            .then(async (res) => {
                return await this.parse(res.data);
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    }

    static async add(resource) {
        return await axios.post('/api/a/' + this.mainPaths, { data: resource, id: true }, {
            headers: {
                "Authorization": this.getAuth()
            }
        })
            .then(async (res) => {
                return await this.parse(res.data);
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    }

    async update(newResource = {}) {
        const updateResource = {
            ...JSON.parse(JSON.stringify(this)),
            ...JSON.parse(JSON.stringify(newResource))
        };
        if (updateResource.files) {
            updateResource.files = Object.keys(updateResource.files).reduce((acc, key) => {
                acc[key] = updateResource.files[key].fileName;
                return acc;
            }, {});
        }

        if (newResource != null) {
            return await axios.put('/api/u/' + this.constructor.mainPaths, { data: updateResource, id: this.id }, {
                headers: {
                    "Authorization": FIREBASE.getAuth()
                }
            })
                .then(async (res) => {
                    return await this.constructor.parse(res.data);
                })
                .catch((error) => {
                    console.error(error);
                    return false;
                });
        } else {
            console.error('La newResource è null.');
            return false;
        }
    }

    async delete(id = '', propPath = null) {
        if (id === '') {
            id = this.id
        }
        if (propPath !== null) {
            propPath = '/' + propPath
        } else {
            propPath = ''
        }
        return await axios.delete('/api/d/' + this.constructor.mainPaths + propPath, { data: { id }, headers: { "Authorization": FIREBASE.getAuth() } })
            .then(async (res) => {
                if (res.data.deleted) {
                    if (id === this.id) {
                        for (const filekey in this.files) {
                            await this.deleteFile(filekey)
                        }
                    }
                    return res.data.deleted;
                } else {
                    return false;
                }
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    }


    async getFiles() {
        return await axios.post(`/api/g-files/${this.id}`, { fileNames: this.files }, {
            headers: {
                "Authorization": FIREBASE.getAuth()
            }
        }).then((res) => {
            if (res.data.urls) {
                this.files = res.data.urls
                return res.data.urls
            } else {
                console.error('Failed to get files:', res.data.message);
                return null
            }
        }).catch((error) => {
            console.error('Get files error:', error);
            return null
        })

    }

    async uploadFiles(selectedFiles) {
        if (!selectedFiles || selectedFiles.length === 0) {
            console.error('No file selected!');
            return null;
        }

        try {
            const resFiles = {}
            for (const file of selectedFiles) {
                // Converti il file in base64 utilizzando una Promise
                const base64Data = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result.split(',')[1]);
                    reader.onerror = reject;
                });

                const fileName = file.name;

                // Effettua la richiesta di upload
                const res = await axios.post(`/api/a-file/${this.id}`, {
                    base64Data,
                    fileName
                }, {
                    headers: {
                        "Authorization": FIREBASE.getAuth()
                    }
                })

                if (res.data) {
                    const [key, fileData] = Object.entries(res.data)[0]
                    resFiles[key] = fileData
                    const files = { ...this.files, ...resFiles }

                    this.files = files
                    await this.update()
                } else {
                    console.error('Upload failed:', res);
                    return null;
                }
            }
            return resFiles
        } catch (error) {
            console.error('Upload error:', error);
            return null;
        }


    }

    async deleteFile(filekey) {
        const fileName = this.files[filekey].fileName
        axios.post(`/api/d-file/${this.id}`, { fileName }, {
            headers: {
                Authorization: FIREBASE.getAuth(),
            },
        }).then(async (res) => {
            if (res.data.deleted) {
                await this.delete(filekey, this.id + '/files')
                delete this.files[filekey]
            } else {
                console.error('Delete failed:', res.data);
            }
        }).catch((error) => {
            console.error('Delete error:', error);
        })
    }
}