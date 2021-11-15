# Introduction 
...

# T0
- **Stato avanzamento**: bici ferma
- **Argomenti**: Sprint, testing, git bash
- **Environments**: PROD, SHARED, ...

# T1
- **Stato avanzamento**: bici ferma + tizia ferma + vento fermo
- **Argomenti**: CI, si aggiunge complessità, conflitti, IDE
- **Environments**: PROD, SHARED, ...

# T2
- **Stato avanzamento**: bici animata + tizia animata + vento fermo
- **Argomenti**: Linting, CI, branch permissions
- **Environments**: PROD, SHARED, ...

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

# T3
- **Stato avanzamento**: bici animata + tizia animata + vento animato (rotto)
- **Argomenti**: TDD, Pull Request Approval
- **Environments**: PROD, SHARED, ...

# T4
- **Stato avanzamento**: bici animata + tizia animata + vento animato (ok)
- **Argomenti**: Hotfix
- **Environments**: PROD, SHARED, ...