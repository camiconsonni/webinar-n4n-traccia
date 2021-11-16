# Introduction 
...

# String 0
- **Stato avanzamento**: bici ferma
- **Argomenti**: Sprint, testing, git bash
- **Environments**: PROD, SHARED

# Sprint 1
- **Stato avanzamento**: bici ferma + tizia ferma + vento fermo
- **Argomenti**: CI, si aggiunge complessità, conflitti, IDE
- **Environments**: PROD, SHARED, STREAM1, STREAM2

Apriamo Git IDE (Gitkraken):
- spieghiamo che ci sono altre opzioni, con piani free o meno free, visualizzazione dello stato del repo
- team leader, su branch `shared`, configura gli ambienti e la ci
  1. stream1:
    - creare folder `stream1` in `environments` con il contenuto di `master`
  2. stream2:
    - creare folder `stream2` in `environments` con il contenuto di `master`
- crea i 2 nuovi branch `stream1` e `stream2` da gitkraken

Branch Stream1:
- Scrive codice per tizia ferma
- committo e pusho si `stream1`
- pull request verso `shared` + merge

Branch Stream2:
- Scrive codice per vento fermo
- committo e pusho si `stream2`
- pull request verso `shared` --> CONFLITTO!
- risolvo il conflitto da gitkraken + merge
- pull request verso `master` + merge


# Sprint 2
- **Stato avanzamento**: bici animata + tizia animata + vento fermo
- **Argomenti**: Linting, CI, branch permissions
- **Environments**: PROD, SHARED, FRN2, STREAM1, STREAM2

Team leader, su branch `shared`:
  - aggiunge il linter e aggiunge step linting alla CI
  - creare folder `frn2` in `environments` con il contenuto di `master`

## Linting
```
> npm install --save-dev eslint@7.32.0 eslint-plugin-jest
```

Crea file `.eslintrc` nella root di progetto
```
{
    "plugins": ["jest"],
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "jest/globals": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "semi": ["error", "never"],
        "quotes": ["error", "single"],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
    }
}
```

aggiungi script al `package.json`
```
"lint": "./node_modules/.bin/eslint ."
```

esegui il linter per cercare gli errori
```
> npm run lint
```

Mostrare gli errori nei file in vs code:
- Estensione ESLint
- Settings > Workspace
```
{
  "eslint.validate": [
    "javascript"
  ]
}
```

Aggiungere job `lint` alla CI:
```
  lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
      with:
        fetch-depth: 0
    - name: Use Node.js
      uses: actions/setup-node@v1
      with:
        node-version: '14.x'
    - shell: bash
      run: |
        npm install
        npm run lint
```

## Branch Permissions
- `master` Require a pull request before merging
- `shared` Require a pull request before merging

Fornitore 2 su branch `frn2`:
- aggiunge codice animazione bici + tizia
- crea pull request da `frn2` a `shared`

Release manager mergia la PR in `shared`

Realease manager fa pr da `shared` a `master` e mergia

# Sprint3
- **Stato avanzamento**: bici animata + tizia animata + vento animato (rotto)
- **Argomenti**: TDD, Pull Request Approval
- **Environments**: PROD, SHARED, FRN2, STREAM1, STREAM2

Team Leader:
- stacca branch `sprint3` da `shared`
- scrive il test per la modifica
```
// __mocks__/api
function post(url, body) {
  return new Promise(function (resolve, reject) {
    if (!body.timestamp || !body.lang) reject(new Error('missing parameters'))
    resolve({ success: true })
  })
}
// index.test.js
const newVisit = require('./index')
it('test newVisit API call', () => {
   expect.assertions(1)
   return newVisit(new Date(), 'es').then(res => expect(res).toEqual(true))
})
```

Dev Junior:
- stacca branch `sprint3` da `shared`
- fa la modifica al codice (non fuzionante per il test)
```
// index.js
async function newVisit(timestamp, lang) {
  try {
    const res = await API.post(
      'https://www.fantozziefigli.com/services/new-visit',
      { timestamp, lang }
    )
    return res.success
  } catch (e) {
    console.error(e)
  }
}
```
- runna i test e falliscono
- sistema e rirunna i test --> TEST OK
- pr da branch `sprint3` a `shared`

Release manager mergia la PR in `shared`
Realease manager fa pr da `shared` a `master` e mergia

# Sprint4
- **Stato avanzamento**: bici animata + tizia animata + vento animato (ok)
- **Argomenti**: Hotfix
- **Environments**: PROD, SHARED, FRN2, STREAM1, STREAM2, HOTFIX

Release manager configura ambiente di hotfix:
- crea branch `ci` da `master`
- crea folder `hotfix` in `environments` copiando il contenuto da hotfix
- crea pipeline per ambiente `hotfix` (copia da master e cambia path nello step di build)
- spiegare merge-back