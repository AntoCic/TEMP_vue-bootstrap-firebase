# Template base Vue, Bootstrap, sass
CMD to start
```sh
npm i
npm run dev
```

> **NOTA:** Se non hai interesse nell'utilizzo di Netlify Functions, puoi cancellare il file `netlify.toml` e la cartella `functions`, e fermarti di leggere qui. Se vuoi comunque pubblicare il sito su Netlify, puoi farlo seguendo solo la "Guida per pubblicare un progetto su Netlify" qui sotto.

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
