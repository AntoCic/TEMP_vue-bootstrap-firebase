import axios from "axios";
import { user } from "../user";

export default class FIREBASE {
    static mainPaths = '';
    // Metodo per configurare le proprietà statiche
    static configure(mainPaths) {
        this.mainPaths = mainPaths;
    }

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
                return await this.parse(res.data); // Usa `parse` statico
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

    static async update(id, newResource) {
        if (newResource != null) {
            return await axios.put('/api/u/' + this.mainPaths, { data: newResource, id }, {
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
        } else {
            console.error('La newResource è null.');
            return false;
        }
    }

    async delete() {
        return await axios.delete('/api/d/' + this.mainPaths, { data: { id: this.id }, headers: { "Authorization": FIREBASE.getAuth() } })
            .then((res) => {
                if (res.data.deleted) {
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
}

// loadImg() {
//     axios.post('/api/g-files', {}, {
//         headers: {
//             "Authorization": this.getAuth()
//         }
//     }).then((res) => {
//         if (res.data.urls) {
//             this.images = res.data.urls
//         } else {
//             console.error('Failed to load images:', res.data.message);
//         }
//     }).catch((error) => {
//         console.error('Load error:', error);
//     })
// }

// async uploadImg(selectedFile) {

//     if (!selectedFile) {
//         console.error('No file selected!');
//         return;
//     }

//     const reader = new FileReader();
//     reader.readAsDataURL(selectedFile);
//     reader.onload = async () => {
//         const base64Data = reader.result.split(',')[1];
//         const fileName = selectedFile.name;

//         axios.post('/api/a-file', {
//             base64Data,
//             fileName
//         }, {
//             headers: {
//                 "Authorization": this.getAuth()
//             }
//         }).then((res) => {
//             if (res.data) {
//                 const [[key, value]] = Object.entries(res.data);
//                 // this.firebase.images[key] = value
//             } else {
//                 console.error('Upload failed:', response.data);
//             }
//         }).catch((error) => {
//             console.error('Upload error:', error);
//         });

//     };

// }

// async deleteImg(fileName) {
//     axios.post('/api/d-file', { fileName }, {
//         headers: {
//             Authorization: this.getAuth(),
//         },
//     }).then((res) => {
//         if (res.data.deleted) {
//             delete this.images[res.data.deleted]
//         } else {
//             console.error('Delete failed:', res.data);
//         }
//     }).catch((error) => {
//         console.error('Delete error:', error);
//     })
// }
// }