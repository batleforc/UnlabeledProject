---
title: Mise en place de l'environnement
slug : /setup
---

Prêt a mettre en place l'environnement Create React App (Appeler CRA dans la suite) TypeScript (Appeler Ts dans la suite) + Serveur TypeScript ?

:::info
  Vous souhaitez retrouver la stack que je vous fait installer ici ? [elle est disponible dans la page StackTech](/docs/stacktechnique)
:::

### 1. Mise en place du client

#### 1.1. Mise en place de CRA

```shell
  yarn create react-app ${Le nom de votre projet} --template typescript
```

Cette commande vous permettras d'initialiser votre projet Create-React-App.

#### 1.2. Mise en place des Packages

```shell
  yarn add @reduxjs/toolkit axios react-redux redux react-router-dom
  yarn add @types/redux @types/react-redux @types/react-router-dom -d
```

Ici vous avez ajouter les package nécessaire a la création de l'application:

- redux : Vous permet de gérer l'état global de l'application.
- axios : Vous permet de faire des requête web.
- react-router-dom : Permet de gérer un système de chemin.

D'autre package sont utiliser :

- react-grid-layout : Permet la gestion de tableau dynamique (Utiliser dans l'interface de la soundboard)
- socket.io-client : Permet d'écouter et lancer des event en temps réel.
- D'autre package dont l'installation est plus compliquer sont expliquer plus bas

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

```json
{
  ...Votre Package.json
  "scripts":{
    "S:Build":"tsc -w --projet ./serveur.tsconfig.json",
    "S:ProdBuild":"cross-env NODE_ENV=production tsc --project ./serveur.tsconfig.json",
    "S:Watch": "nodemon -q -w BuildServer BuildServer/index.js",
    "S:DevWatch": "cross-env NODE_ENV=development concurrently --names \"S:Build,S:Watch\" -c \"grey.bold,blue.bold\" \"yarn:S:Build\" \"yarn:S:Watch\" --node-env=development",
  }
}
```

=> S:Build : Intérprétation du code en TypeScript vers JavaScript en temps réel (Le code interpréter a nouveaux a chaque sauvegarde).

=> S:ProdBuild : Interprétation du code pour la production.

=> S:Watch : Exécution du code du dossier BuildServer.

=> S:DevWatch : Exécution en parallèle du build server ainsi que de l'exécuteur serveur.

#### 2.3 Les autre paquet

D'autre packet sont utiliser pour la partie serveur t'elle que :

- Discordjs : Interface avec discord. Facilite fortement le développement de bot.
- sqlite && sqlite3 : Framework permettant l'utilisation d'une base de donnée.
- nconf : Permet l'utilisation de configuration .json, les chemin vers les base de donnée ou autre sont sauvegarder de cette manière.
- chalk : Permet la coloration du terminal.

Certain paquet sont utiliser la partie vocal de DiscordJs:

- Sodium
- utf-8-validate
- opusscript
- ffmpeg-static
- bufferutil

Tout ces paquet sont utiliser afin de fluidifier les flux audio ainsi que permettre leur lecture.

Un autre paquet est utiliser pour la lecture de vidéo youtube : ytdl-code

### 3. Mise en place de Craco et TailwindCSS

Create React App Configuration Override (Craco) est un package qui permet de modifié le package react-script.

```shell
  yarn add @craco/craco
```

Puis créer un fichier correspondant a la configuration de craco:

```js title="/craco.config.js"
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}
```

Pour appliquer la configuration de craco penser a modifier votre package.json et remplacer les "react-scripts" par craco.

La prochaine étape consiste a générer puis modifier la configuration de Tailwind, Tailwind est un framework Css complet (et non pas une bibliothèque de composant).

```shell
  npx tailwindcss init
```

Cette commande vous permettra d'installer tailwindcss, il ne vous reste plus qu'a modifier la configuration pour lui indiquer ou ce situe le code source et ajouter les mot clef pour intégrer le css dans un de vos fichier .css :

```js title="/tailwind.config.js"
module.exports ={
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
}
```

```css title="Votre fichier en .css"
@tailwind base;
@tailwind components;
@tailwind utilities;

... Vos style css
```

### Pourquoi ?

#### Tailwind

J'ai choisis Tailwind pour le faite qu'il diffère des librairie que j'utilisais avant (et je ne retournerais plus en arrière). Par le passer j'utilisais [Material-ui](https://material-ui.com/), qui en plus d'être lourd possède beaucoup de fonctionnalité caché. Oui j'ai choisis de réinventer la roue pour pas mal de fonctionnalité mais connaître les tenant et les aboutissant de celle ci ma été extrêmement bénéfique.

#### Koa

Ancien utilisateur d'Express je souhaitait apprendre a utiliser de nouveaux framework/packet pour la gestion web.

Koa est plus long a mettre en place mais me parais plus robuste sur le long terme.

#### Socket.io

Avec un système comme Discordjs qui est utiliser beaucoup d'event et d'action asynchrone sont effectuer. Une mise a jour de l'interface en temps réel est donc devenue obligatoire et un fonctionnement ou socket.io ainsi que Redux sont harmonie est devenue tres agréable a utiliser.

#### TypeScript

TypeScript, Ni plus ni moins qu'un javascript typer, de la rigueur dans le respect des type, des interface. Je n'ai pas été jusqu'au bout de ce qu'est capable de m'offrir le typescript, cette premiére expérience avec me rend confiant vis a vis du faite que malgré la mauvais image que les gens ont du Js celui ci peux tres bien la dépasser.

Un point important et qui ma beaucoup fait rire (car oui passer 3h a faire du bug fix et réaliser que le type utiliser pour une variable n'est pas la bonne mais arriver.) est qu'il est nécessaire d'installer les packet en "@types" mais il faut faire attention, certain packet fournisse ces type directement.
