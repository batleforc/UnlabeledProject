---
title: Mise en place de l'environnement
slug : /setup
---

Prêt à mettre en place l'environnement Create React App (Appeler CRA dans la suite) TypeScript (Appeler Ts dans la suite) + Serveur TypeScript ?

:::info
  Vous souhaitez retrouver la stack que je vous fait installer ici ? [elle est disponible dans la page StackTech](/docs/stacktechnique)
:::

### 1. Mise en place du client

#### 1.1. Mise en place de CRA

```shell
  yarn create react-app ${Le nom de votre projet} --template typescript
```

Cette commande vous permettra d'initialiser votre projet Create-React-App.

#### 1.2. Mise en place des Packages

```shell
  yarn add @reduxjs/toolkit axios react-redux redux react-router-dom
  yarn add @types/redux @types/react-redux @types/react-router-dom -d
```

Ici vous avez ajouté les packages nécessaires à la création de l'application:

- redux : Vous permet de gérer l'état global de l'application.
- axios : Vous permet de faire des requêtes web.
- react-router-dom : Permet de gérer un système de chemin.

D'autres packages sont utilisés :

- react-grid-layout : Permet la gestion de tableau dynamique (Utiliser dans l'interface de la soundboard)
- socket.io-client : Permet d'écouter et lancer des events en temps réel.
- D'autres packages, dont l'installation est plus compliquée, sont expliqués plus bas.

### 2. Mise en place serveur (Koa + Socket.io)

#### 2.1. Package

```shell
  yarn add @koa/cors @koa/router koa koa-body koa-mount koa-static socket.io typescript nodemon concurrently cross-env dotenv-flow
  yarn add @types/koa @types/koa-bodyparser @types/koa-cors @types/koa-json @types/koa-router @types/koa-static @types/node @types/socket.io -d
```

Les packages nécessaires aux développement sont ajoutés ainsi que leur type.

#### 2.2 Configuration

Afin de créer une configuration compléte il est nécessaire de créer quelques fichiers et dossiers.

Commencer par créer à la racine un dossier Server puis place à la configuration Ts.

```json title="/serveur.tsconfig.json"
  {
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "outDir": "BuildServer", // Fichier de destination du code compilé.
    "target": "es6", // La version de JavaScript visée.
    "strict": true, // Activation de toutes les verifications strictes liées aux Ts.
    "allowJs":true,
    "skipLibCheck":true // Permet de résoudre les cas où deux Lib ont le même type.
  },
  "include": [
    "Server/**/*" // Le dossier contenant le code source du serveur.
  ]
}
```

Ce fichier est la configuration typescript appliquée à votre serveur.

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

=> S:Build : Intérprétation du code en TypeScript vers JavaScript en temps réel (Le code interprété à nouveau à chaques sauvegardes).

=> S:ProdBuild : Interprétation du code pour la production.

=> S:Watch : Exécution du code du dossier BuildServer.

=> S:DevWatch : Exécution en parallèle du build server ainsi que de l'exécuteur serveur.

#### 2.3 Les autres paquets

D'autres packets sont utilisés pour la partie serveur tel que :

- Discordjs : Interface avec discord. Facilite fortement le développement de bot.
- sqlite && sqlite3 : Framework permettant l'utilisation d'une base de donnée.
- nconf : Permet l'utilisation de configuration .json, les chemins vers les bases de donnée ou autre sont sauvegardée de cette manière.
- chalk : Permet la coloration du terminal.

Certains paquets sont utilisés pour la partie vocal de DiscordJs:

- Sodium
- utf-8-validate
- opusscript
- ffmpeg-static
- bufferutil

Tous ces paquets sont utilisés afin de fluidifier les flux audios ainsi que permettre leur lecture.

Un autre paquet est utilisé pour la lecture de vidéo youtube : ytdl-code

### 3. Mise en place de Craco et TailwindCSS

Create React App Configuration Override (Craco) est un package qui permet de modifier le package react-script.

```shell
  yarn add @craco/craco
```

Puis créer un fichier correspondant à la configuration de craco:

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

Pour appliquer la configuration de craco : penser à modifier votre package.json et remplacer les "react-scripts" par craco.

La prochaine étape consiste à générer puis modifier la configuration de Tailwind, Tailwind est un framework Css complet (et non pas une bibliothèque de composant).

```shell
  npx tailwindcss init
```

Cette commande vous permettra d'installer tailwindcss. Il ne vous reste plus qu'à modifier la configuration pour lui indiquer où se situe le code source, puis d'ajouter les mots clefs pour intégrer le css dans un de vos fichiers .css :

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

J'ai choisis Tailwind en raison des différences entre les librairies que j'utilisais avant (et je ne retournerais plus en arrière). Par le passée j'utilisais [Material-ui](https://material-ui.com/), qui en plus d'être lourd possède un grand nombre de fonctionnalité cachées. Oui j'ai choisis de réinventer la roue pour pas mal de fonctionnalités mais connaître les tenants et les aboutissants de celle-ci m'a été extrêmement bénéfique.

#### Koa

Ancien utilisateur d'Express, je souhaitais apprendre à utiliser de nouveaux frameworks/packets pour la gestion web.

Koa est plus long à mettre en place mais me parais plus robuste sur le long terme.

#### Socket.io

Avec un système comme Discordjs qui est utilisé beaucoup d'event et d'action asynchrone sont effectuées. Une mise à jour de l'interface en temps réel est donc devenue obligatoire et un fonctionnement ou socket.io ainsi que Redux sont en harmonie et devenue très agréable à utiliser.

#### TypeScript

TypeScript, ni plus ni moins qu'un javascript typer, de la rigueur dans le respect des types, des interfaces. Je n'ai pas été jusqu'au bout de ce qu'est capable de m'offrir le typescript. Cependant cette premiére expérience me rend confiant, malgré la mauvaise image que les untilisateurs ont du Js, celle-ci peut très bien dépasser cette dernière.

Un point important et qui m'a beaucoup fait rire (car oui, passer 3h à faire du bug fix et réaliser que le type utilisé pour une variable n'est pas la bonne m'est arrivé.) est qu'il est nécessaire d'installer les packest en "@types" mais il faut faire attention, certains packets fournissent ces types directement.
