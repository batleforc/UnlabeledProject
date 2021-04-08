---
title: Mise en place de l'environnement
slug : /setup
---

Prêt a mettre en place l'environnement Create React App (Appeler CRA dans la suite) TypeScript (Appeler Ts dans la suite) + Serveur TypeScript ?

:::info
  Vous souhaitez retrouver la stack que je vous fait installer ici ? [elle est disponible dans la page StackTech](/docs/stacktechnique)
:::

### 1. Mise en place de CRA

```shell
  yarn create react-app ${Le nom de votre projet} --template typescript
```

Cette commande vous permettras d'initialiser votre projet Create-React-App.

### 2. Mise en place serveur (Koa + Socket.io)

#### 2.1. Package

```shell
  yarn add @koa/cors @koa/router koa koa-body koa-mount koa-static socket.io typescript nodemon concurrently cross-env dotenv-flow
  yarn add @types/koa @types/koa-bodyparser @types/koa-cors @types/koa-json @types/koa-router @types/koa-static @types/node @types/socket.io -d
```

Les package nécessaire aux développement sont ajouter ainsi que leur type.

#### 2.2 Configuration

Afin de créer une configuration compléte il est nécessaire de créer quelque fichier et dossier.

Commencer par créer a la racine un dossier Server puis place a la configuration Ts.

```json title="/serveur.tsconfig.json"
  {
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "outDir": "BuildServer", // Fichier de destination du code compiler
    "target": "es6", // La version de JavaScript viser
    "strict": true, // Activation de toute les verification strict lier aux Ts
    "allowJs":true,
    "skipLibCheck":true // Permet de résoudre les cas ou deux Lib ont le même type
  },
  "include": [
    "Server/**/*" // Le dossier contenant le code source du serveur
  ]
}
```

Ce fichier est la configuration typescript appliquer a votre serveur.
