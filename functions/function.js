// const {API_KEY} = process.env;

// funzione netlify per gestire le chiamate
exports.handler = async function (event, context) {
  // inizializzazione del mio router
  await router.start(event);

  // esempio rotta get senza path params
  router.GET('', () => {
    // il metodo setRes setta o aggiunge un parametro
    router.setRes("HAI FATTO UNA CHIAMATA GET NETLIFY")
  })

  // esempio rotta post con parametro /test che legge un il body 
  router.POST('test', async () => {
    router.setRes(`HAI FATTO UNA CHIAMATA POST /test FUNCTION NETLIFY. msg: ${router.bodyParams.msg}`)
  })

  return router.sendRes()
};



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
      this.error(500, 'ERROR 500: non hai inizializzato il router, SCRIVI: router.start(event);')
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
