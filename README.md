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

Aggiungiamo Linting alla CI?
```
name: CI
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Install modules
      run: yarn
    - name: Run ESLint
      run: eslint . --ext .js,.jsx,.ts,.tsx
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
- stacca branch `sprint3-test` da `shared`
- scrive il test per la modifica
- mergia branch `sprint3-test` in `shared`

Dev Junior:
- stacca branch `sprint3` da `shared`
- fa la modifica al codice (non fuzionante per il test)
- runna i test e falliscono
- sistema e rirunna i test --> TEST OK
- pr da branch `sprint3-test` a `shared`

Release manager mergia la PR in `shared`
Realease manager fa pr da `shared` a `master` e mergia

# Sprint4
- **Stato avanzamento**: bici animata + tizia animata + vento animato (ok)
- **Argomenti**: Hotfix
- **Environments**: PROD, SHARED, ...