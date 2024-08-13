# Template base Vue, Bootstrap, sass, firebase

### Guida per Iniziare con Firebase

Questa guida ti aiuterà a configurare Firebase nel tuo progetto, includendo la creazione di un database in tempo reale, l'impostazione dell'autenticazione, e il recupero delle chiavi necessarie per l'integrazione.

---

#### 1. Creazione del Progetto su Firebase

1. Vai su [Firebase Console](https://console.firebase.google.com).
2. Esegui l'accesso con il tuo account Google o registrati se non hai un account.
3. Crea un nuovo progetto seguendo le istruzioni sullo schermo.

---

#### 2. Configurazione del Realtime Database

1. Dopo aver creato il progetto, accedi alla sezione **Realtime Database**.
2. Crea un nuovo database.
3. Modifica le regole di accesso cliccando su **Regole** e inserisci il seguente codice JSON:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "users": {
      "$userId": {
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid"
      }
    }
  }
}
```

#### 3. Configurazione del Firebase Storage

1. **Aggiungi Firebase Storage al Progetto**:
   - Nella **Firebase Console**, seleziona il tuo progetto.
   - Nel menu di navigazione, seleziona **Storage**.
   - Fai clic su **Inizia** per configurare Firebase Storage.

2. **Imposta le Regole di Sicurezza**:
   - Dopo aver abilitato Firebase Storage, fai clic su **Regole**.
   - Inserisci il seguente codice per le regole di sicurezza:

```js
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /users/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

#### 4. Impostazione dei Provider di Autenticazione

1. Torna alla sezione **Autenticazione**.
2. Clicca su **Inizia** o direttamente su **Email/Password** e abilita questa modalità di autenticazione.
3. Aggiungi un altro provider di autenticazione cliccando su **Aggiungi provider** e seleziona **Google**.
   - Abilita Google come provider.
   - Inserisci un nome a tua scelta (IMPORTANTE).
   - Seleziona la tua email dal menu.
   - Salva le impostazioni.

---

#### 5. Recupero delle Chiavi Necessarie

1. Clicca sull'icona della rotella in alto a destra e seleziona **Impostazioni progetto**.
2. Vai su **Account di servizio** e genera una nuova chiave cliccando sul pulsante apposito.
3. Una volta scaricato il file, crea un file `.env` eseguendo il seguente comando nel terminale del progetto:

```sh
cp .env.example .env 
```

Compila le variabili nel file `.env` utilizzando le chiavi presenti nel file scaricato (escludendo la variabile `type`).
La variabile `FIREBASE_DATABASE_URL` la trovi nella pagina da cui hai scaricato la chiave, nella var `databaseURL`.

#### 6. Configurazione delle Chiavi Pubbliche

1. Sempre nelle **Impostazioni progetto**, vai su **Generali**.
2. Nella sezione **App**, clicca sull'icona `</>`, inserisci un nickname per l'app e registrala.
3. Copia le variabili `apiKey` e `authDomain` e `storageBucket` dalla sezione **Firebase SDK snippet** e incollale nel file `src/firebase.js` nella `const firebaseConfig` tranne `storageBucket` che va copiato dentro `functions/function.js`.

---

#### 7. Configurazione dei Domini Autorizzati

> **DOPO IL DEPLOY**: Per far funzionare l'autenticazione nel sito online, assicurati di inserire l'URL del sito su **Autenticazione > Impostazioni > Domini autorizzati** e aggiungi il dominio del tuo sito.

---

# CMD per inizializzare
```sh
npm i
```

> **ATTENZIONE:** Se utilizzi Netlify Functions, assicurati di aver un account su Netlify e segui i passaggi elencati di seguito:

### Guida per pubblicare un progetto su Netlify

1. **Pubblica il progetto su GitHub**
   - Assicurati che il tuo progetto sia stato caricato su GitHub.

2. **Collega il tuo account GitHub con Netlify**
   - Vai su Netlify e collega il tuo account GitHub a Netlify.

3. **Aggiungi un nuovo sito**
   - Su Netlify, clicca su "Aggiungi un nuovo sito".

4. **Importa da un progetto esistente**
   - Seleziona "Importa da un progetto esistente".

5. **Seleziona GitHub**
   - Scegli GitHub come fonte del progetto.

6. **Seleziona il tuo progetto**
   - Dalla lista dei tuoi progetti su GitHub, seleziona quello che vuoi pubblicare.

7. **Aggiungi un nome disponibile per il sito**
   - Inserisci un nome disponibile per il sito su Netlify.

8. **Fai il deploy**
   - Clicca sul bottone apposito in basso per avviare il deploy.

9. **Il tuo sito è online**
   - Una volta completato il deploy, il tuo sito sarà online.

> **IMPORTANTE**: Per far funzionare l'autenticazione nel sito online, assicurati di inserire l'URL del sito su  **Firebase > Autenticazione > Impostazioni > Domini autorizzati** e aggiungi il dominio del tuo sito.

### Netlify CLI
Installa Netlify CLI a livello globale lanciando
```sh
npm install netlify-cli -g
```

Effettua il login con il comando di sotto. e segui la procedura di login a netlify
```sh
ntl login
```

Collega il progetto locale con il sito online. 
In questa maniera se hai dichiarato environment variables nel sito online verranno lette anche in locale
lancia
```sh
ntl link
```

testa il progetto su un serverver locale lanciando
```sh
ntl dev
```
