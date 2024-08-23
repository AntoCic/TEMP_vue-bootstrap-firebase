// ____ ____ ____ ____ ____ ____ ____ 
// ||A |||n |||t |||o |||C |||i |||c ||
// ||__|||__|||__|||__|||__|||__|||__||
// |/__\|/__\|/__\|/__\|/__\|/__\|/__\|

// ATTENZIONE Segui il tutorial nel README.md.

// Per inizializzare correttamente il progetto, devi prima impostare le variabili di ambiente. 
// Fai attenzione, alcune di queste sono obbligatorie.
// *  FIREBASE_PROJECT_ID,
// *  FIREBASE_PRIVATE_KEY_ID,
// *  FIREBASE_PRIVATE_KEY,
// *  FIREBASE_CLIENT_EMAIL,
// *  FIREBASE_CLIENT_ID,
// *  FIREBASE_AUTH_URI,
// *  FIREBASE_TOKEN_URI,
// *  FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
// *  FIREBASE_CLIENT_X509_CERT_URL,
// *  FIREBASE_UNIVERSE_DOMAIN,
// *  FIREBASE_DATABASE_URL,
//   FIREBASE_STORAGE_BUCKET

// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%
import admin from 'firebase-admin';

exports.handler = async function (event, context) {
  await router.start(event);
  // AUTH route
  if (router.authToken) {
    const user = await firebase.user.logged(router.authToken);
    if (user) {
      await router.POST('g', async () => {
        const res = await firebase.user.get(router.pathParams);

        if (res) { router.setRes(res); }
      })

      await router.POST('a', async () => {
        let { id, data } = router.bodyParams
        if (data) {
          const res = await firebase.user.add(data, router.pathParams, id);
          if (res) { router.setRes(res); }
        } else {
          router.error(400, '^,^ Missing id or data');
        }
      })

      await router.PUT('u', async () => {
        const { id, data } = router.bodyParams
        if (id && data) {
          const res = await firebase.user.update(id, data, router.pathParams);
          if (res) { router.setRes(res); }
        } else {
          router.error(400, '^,^ Missing id or data');
        }
      })

      await router.DELETE('d', async () => {
        const id = router.bodyParams.id

        if (id !== null || id !== undefined) {
          const res = await firebase.user.delete(id, router.pathParams);
          if (res) { router.setRes(res); }
        } else {
          router.error(400, '^,^ Missing id');
        }
      })

      await router.POST('g-files', async () => {
        let { fileNames } = router.bodyParams;
        fileNames = fileNames ?? null
        const res = await firebase.user.getFiles(fileNames, router.pathParams);
        if (res) { router.setRes(res); }

      })

      await router.POST('a-file', async () => {
        const { base64Data, fileName } = router.bodyParams;

        if (base64Data && fileName) {
          const res = await firebase.user.addFile(base64Data, fileName, router.pathParams);
          if (res) { router.setRes(res); }
        } else {
          router.error(400, '^,^ Missing base64Data or fileName');
        }
      })

      await router.POST('d-file', async () => {
        const { fileName } = router.bodyParams;
        if (fileName) {
          const res = await firebase.user.deleteFile(fileName, router.pathParams);
          if (res) { router.setRes(res); }

        } else {
          router.error(400, '^,^ Missing fileName');
        }
      })

    }
  }

  return router.sendRes()

};




// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%
//  ____  _____ _____ _   _   _ _   _____                      |
// |  _ \| ____|  ___/ \ | | | | | |_   _|                     |             
// | | | |  _| | |_ / _ \| | | | |   | |                       |
// | |_| | |___|  _/ ___ \ |_| | |___| |                       |
// |____/|_____|_|/_/   \_\___/|_____|_|_____ ____             |
// | | | |_   _|_ _| |   |_ _|_   _|_ _| ____/ ___|            |
// | | | | | |  | || |    | |  | |  | ||  _| \___ \            |
// | |_| | | |  | || |___ | |  | |  | || |___ ___) |           |
//  \___/  |_| |___|_____|___| |_| |___|_____|____/            |
//                                                             |
// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%

class FIREBASE {
  constructor(mainPaths = []) {
    const required = {
      type: 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : null,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,

      idIndex: Math.floor(Math.random() * 100),
    };

    const optional = {
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    };

    mainPaths.unshift('public')
    mainPaths.unshift('user')
    mainPaths = this.createMainPaths(mainPaths)

    Object.assign(this, { ...required, ...optional }, mainPaths);

    for (const key in required) {
      if (this[key] == null) {
        throw new Error(`Il campo ${key} è obbligatorio e non può essere nullo o indefinito.`);
      }
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        type: this.type,
        project_id: this.project_id,
        private_key_id: this.private_key_id,
        private_key: this.private_key,
        client_email: this.client_email,
        client_id: this.client_id,
        auth_uri: this.auth_uri,
        token_uri: this.token_uri,
        auth_provider_x509_cert_url: this.auth_provider_x509_cert_url,
        client_x509_cert_url: this.client_x509_cert_url,
        universe_domain: this.universe_domain,
      }),
      databaseURL: this.databaseURL,
      storageBucket: this.storageBucket
    });

    this.database = admin.database();
    this.bucket = admin.storage().bucket();
  }

  // Method che risponde con un nuovo unique id ogni volta che viene chiamata
  newId() {
    let newId = this.idIndex.toString(36)
    this.idIndex++;
    newId += Math.random().toString(36).substring(2, 7) // stringa casuale
    newId += "-" + Date.now().toString(36) // converte in base 36
    return newId;
  }

  createMainPaths(mainPaths) {
    const oldMainPaths = mainPaths;
    let newMainPaths = {}

    for (const pathName of oldMainPaths) {
      newMainPaths[pathName] = {
        pathName,

        async get(pathParams = []) {
          try {
            const fullPath = this.getFullPath(pathParams)
            const snapshot = await firebase.database.ref(fullPath).once('value');
            return snapshot.val() || {};
          } catch (error) {
            router.error(500, '^,^ Failed: ' + String(error));
            return false;
          }
        },

        async add(data, pathParams = [], id = false) {
          try {
            const fullPath = this.getFullPath(pathParams)
            const newId = id === true ? '/' + firebase.newId() : id === false ? '' : '/' + id;

            if (newId !== '') {
              id = newId.substring(1)
              await firebase.database.ref(fullPath + newId).set({ ...data, id });
              return { [id]: { ...data, id } };
            } else {
              await firebase.database.ref(fullPath + newId).set(data);
              return data
            }
          } catch (error) {
            router.error(500, '^,^ Failed: ' + String(error));
            return false;
          }
        },

        async update(id, data, pathParams = []) {
          try {
            const fullPath = this.getFullPath(pathParams)
            const content = { [id]: data }
            await firebase.database.ref(fullPath).update(content);

            return content;
          } catch (error) {
            router.error(500, '^,^ Failed: ' + String(error));
            return false;
          }
        },

        async delete(id, pathParams = []) {
          try {
            const fullPath = this.getFullPath(pathParams)

            await firebase.database.ref(`${fullPath}/${id}`).remove();

            return { deleted: id };
          } catch (error) {
            router.error(500, '^,^ Failed: ' + String(error));
            return false;
          }

        },

        async getFiles(fileNames = null, pathParams = []) {
          const fullPath = this.getFullPath(pathParams);
          try {
            // Ottiene tutti i file con il prefisso specificato
            const [files] = await firebase.bucket.getFiles({ prefix: fullPath });

            const urls = {};
            // Mappa su ogni file e crea un oggetto con i file richiesti e i rispettivi URL
            for (const file of files) {
              const fileName = file.name.split('/').pop(); // Ottiene solo il nome del file

              if (!fileNames) {
                const url = await this.getUrlFile(file);
                urls[fileName] = { url };
              } else if (Object.values(fileNames).includes(fileName)) {
                const key = Object.keys(fileNames).find(key => fileNames[key] === fileName);
                const url = await this.getUrlFile(file);

                urls[key] = { fileName, url };
              }
            }

            // Restituisce gli URL dei file trovati
            return { urls };
          } catch (error) {
            router.error(500, '^,^ Failed: ' + String(error));
            return false;
          }
        },

        async addFile(base64Data, fileName, pathParams = []) {
          try {
            // Decodifica i dati da base64
            const buffer = Buffer.from(base64Data, 'base64');

            // Determina il tipo di contenuto (MIME type) basato sull'estensione del file
            const extension = fileName.split('.').pop().toLowerCase();
            const contentTypes = {
              'jpg': 'image/jpeg',
              'jpeg': 'image/jpeg',
              'png': 'image/png',
              'gif': 'image/gif',
              'svg': 'image/svg+xml',
              'txt': 'text/plain',
              'pdf': 'application/pdf',
              'doc': 'application/msword',
              'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              'csv': 'text/csv',
            };
            const contentType = contentTypes[extension];
            if (!contentType) {
              router.error(500, '^,^ Failed: ContentType');
              return false;
            }

            // Genera un nuovo nome per il file
            const fullName = `${firebase.newId()}_${fileName}`;

            // Costruisce il percorso nel bucket
            const fullPath = this.getFullPath(pathParams)
            const file = firebase.bucket.file(`${fullPath}/${fullName}`);

            // Salva il file nel bucket con il tipo di contenuto corretto
            await file.save(buffer, { contentType });

            // Ottiene l'URL firmato per l'accesso al file
            const url = await this.getUrlFile(file)

            const key = fullName.split('_')[0]
            // Restituisce l'URL del file caricato
            return { [key]: { fileName: fullName, url } };
          } catch (error) {
            router.error(500, '^,^ Failed: ' + String(error));
            return false;
          }

        },

        async deleteFile(fileName, pathParams = []) {

          const fullPath = this.getFullPath(pathParams)

          try {
            await firebase.bucket.file(`${fullPath}/${fileName}`).delete();

            return { deleted: fileName };
          } catch (error) {
            router.error(500, '^,^ Failed: ' + String(error));
            return false;
          }
        },

        getFullPath(pathParams) {
          let databasePath = '';
          if (pathParams.length >= 2) {
            for (let index = 1; index < pathParams.length; index++) {
              databasePath += '/' + pathParams[index];
            }
          }

          let fullPath = this.pathName
          fullPath += this.userData ? '/' + this.userData.uid : ''
          fullPath += databasePath

          console.log([fullPath]);

          return fullPath
        },

        async getUrlFile(file) {
          let expires = new Date();
          expires.setDate(expires.getDate() + 1);
          expires = expires.toISOString();

          const [url] = await file.getSignedUrl({
            action: 'read',
            expires,
          });

          return url
        }
      }

      if (pathName === 'user') {
        newMainPaths[pathName].logged = async function (idToken) {
          this.userData = null;
          try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            this.userData = await admin.auth().getUser(decodedToken.uid);
            return true;
          } catch (error) {
            router.error(401, '^,^ Unauthorized');
            return false;
          }
        };

      }
    }
    return newMainPaths
  }

}
// ATTENZIONE inizializzare FIREBASE esattamente cosi.
const firebase = new FIREBASE()

// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%
// %-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%-%

// Oggetto che ho creato per gestire e semplificare le chiamate al server
const router = {
  // VAR UTILITY
  // contiene tuttu l'evento della chiamata
  event: null,
  // contiene un la risposta nel caso sono stete settate piú risposte é un array
  response: null,
  // status code che viene inviato con la risposta
  statusCode: 200,

  // var boolean di controllo si attiva se trova un errore
  stateError: false,
  // var boolean di controllo si attiva nel momento in cui viene settata la prima risposta
  // per fornire un riferimento per trasformare in caso di un secondo set la risposta in un array
  isSecondSet: false,

  // contiene tutti i path parems
  pathParams: [],
  // contiene tutti i body parems
  bodyParams: null,

  // conta le chiamata ricevute per debugging
  callCounter: 0,

  // contiene se presente nell header l'autentication il JWT
  authToken: null,

  // metodo OBLIGATORIO per inizializzare le variabili ricavate dallévento della chiamata
  async start(event) {
    this.callCounter++ // debugging
    let attesa = 0 // debugging
    while (this.event) {
      attesa++ // debugging
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    console.log(`Call ${this.callCounter}: ${event.httpMethod} ${event.path} => attesa totale fine chiamata precedente ms:${attesa * 10}`); // debugging
    this.event = event
    this.stateError = false;
    this.statusCode = 200;
    this.bodyParams = null;
    this.authToken = this.event.headers.authorization || null;

    this.clearRes();

    this.setBodyParams();

    this.pathParams = this.getPathParams();
  },

  // metodo per debugging ti ricorda che devi inizializzare la chiamata
  isStarted() {
    if (this.event && !this.stateError) {
      return true
    } else {
      console.error('ERROR 500: non hai inizializzato il router, SCRIVI: router.start(event);');
      this.error(500, '^,^ ERROR 500: non hai inizializzato il router, SCRIVI: router.start(event);')
      return false
    }
  },

  // metodo per settare una o piú risposte se eseguito piú volte
  setRes(response) {
    if (this.isStarted()) {
      if (this.response) {
        if (this.isSecondSet) {
          this.response = [this.response]
          this.isSecondSet = false
        }
        this.response.push(response)

      } else {
        this.response = response
        this.isSecondSet = true
      }
    }
  },

  // metodo che ripulisce la risposta
  clearRes() {
    if (this.isStarted()) {
      this.isSecondSet = false;
      this.response = null
    }
  },

  // metodo che setta delle variabili per inviare un errore
  error(statusCode = 400, error = 'Errore: 400 Bad Request') {
    this.stateError = true
    this.response = error;
    this.statusCode = statusCode
  },

  // metodo OBBLIGATORIO per inviare la risposta
  sendRes() {
    this.event = null;
    if (this.response === null) {
      this.error();
    }
    return {
      statusCode: this.statusCode,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.response),
    }
  },

  // metodo per settare su pathParams i path params utili
  getPathParams() {
    if (this.isStarted()) {
      const params = this.event.path.split("/")
      if (params.length > 2) {
        for (let index = 0; index < 2; index++) {
          params.shift();
        }

        return params
      } else {
        return [""]
      }
    }
  },

  // metodo per ottenere i parametri
  // di defaul viene utilizzata per ottenere il primo parametro che viene indicato nelle richeste
  params(index = 0) {
    if (this.pathParams.length >= index + 1) {
      return this.pathParams[index]
    } else {
      return false
    }
  },

  // metodo per settare la mia var bodyParams con un oggetto contenete tutti i parametri del body
  setBodyParams() {
    if (this.event.body) {
      this.bodyParams = JSON.parse(this.event.body)
    }
  },

  // controllo dell'evento della chiamata e esegue la funzione richesta
  async checkCall(pathParam, ArrowFunction, method) {
    if (this.event.httpMethod === method) {
      if (pathParam === this.params()) {
        return await ArrowFunction();
      } else {
        return false
      }
    } else {
      return false
    }
  },

  // caso chiamata tipo GET
  async GET(pathParam, ArrowFunction) {
    return await this.checkCall(pathParam, ArrowFunction, "GET")
  },
  // caso chiamata tipo POST
  async POST(pathParam, ArrowFunction) {
    return await this.checkCall(pathParam, ArrowFunction, "POST")
  },
  // caso chiamata tipo PUT
  async PUT(pathParam, ArrowFunction) {
    return await this.checkCall(pathParam, ArrowFunction, "PUT")
  },
  // caso chiamata tipo PATCH
  async PATCH(pathParam, ArrowFunction) {
    return await this.checkCall(pathParam, ArrowFunction, "PATCH")
  },
  // caso chiamata tipo DELETE
  async DELETE(pathParam, ArrowFunction) {
    return await this.checkCall(pathParam, ArrowFunction, "DELETE")
  },
}