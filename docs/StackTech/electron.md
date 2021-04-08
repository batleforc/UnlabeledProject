---
title: Electron
slug : /electron
---

KEZAKO ?

Cette partie d'atome est un framework permettant de développer des application desktop multi-plateformes a partir de JavaScript/Html/CSS.

Le processus de développement est "Simple".

## Mise en place d'un environnement de dev

:::info

Pour la suite de cette page je part du principe qu'on ajoute la stack electron sur un projét déja existant, dans une autre doc j'explique la mise en place de mon environnement post electron.

L'environnement [pré-electron est disponible ici](/docs/setup)

:::

### 1. Installation des packages

```shell
  yarn add electron electron-builder wait-on concurrently electron-is-dev
```

Electron permet de lancer la solution sans build la solution compléte.

Electron-Builder permet de compiler la solution.

Wait-On permet d'attendre une réponse d'une url spécifique pour ici continuer le processus.

Concurrently permet de lancer plusieurs commande aux même moment.

### 2. Un peu de configuration

```json title="package.json"
{
  ... le reste de votre package.json
  "main": "./build/electron.js",
  "build": {
    "productName": "unlabeledProject",
    "appId": "com.example.unlabeledProject",
    "icon": "build/toolbox.png",
    "asar": true,
    "files": [
      "package.json",
      "build/**/*",
      "node_modules/**/*",
      "BuildServer/**/*"
    ]
  },
}
```

Toute ces ligne sont vraiment nécessaire ?

Dans notre cas oui mais je suis la pour vous les expliquer:

- main : L'emplacement de votre fichier electron.js, celui ci est le point d'entrer de votre application (imaginer cliquer sur ce fichier quand vous lancer la solution finale ou uniquement en dev)
- build:
  - productName : Le nom de votre produit (sera utiliser pour la compilation de votre exécutable)
  - appId : Id Linux/Apple, cette id permet de reconnaître le package.
  - icon : L'icon utiliser pour vos exécutable (penser a bien importer le dossier ou il est dans les fichier)
  - asar : Si vous utiliser le format asar pour vos fichier compresser. théoriquement il accéléré les require.
  - files: Tout les fichier/dossier inclut dans le package finale, penser a include le node_modules, vos ou votre dossier de source ainsi que votre icon (ici build contient le client ainsi que l'icon)


### 3. Ajout des script

```json title="package.json"
{
  ... le reste de votre package.json
  "scripts":{
    "start":"VOTRE SCRIPT DE STARTUP",
    "build":"VOTRE SCRIPT DE BUILD",
    "postinstall": "electron-builder install-app-deps",
    "electronDev": "concurrently \"yarn start\" \"wait-on http://localhost:3000 && electron .\"",
    "electronAlone":"electron .",
    "ebuild": "yarn run build && node_modules/.bin/build",
    "electron-pack": "build --em.main=build/electron.js",
    "pack": "electron-builder --dir",
    "dist": "electron-builder",
    "distStartup":"yarn build && yarn dist"
  }
}
```

Pour le bon fonctionnement de la solution TOUT ces script sont nécessaire:

- postinstall : Est exécuter apres l'installation d'un package, il permet de re-construire les extension dans un format propice a l'utilisation electron.
- electronDev : Permet de lancer votre environnement de dev via start puis d'attendre que celui ci sois lancer pour lancer le client electron.
- electronAlone : Dans beaucoup de cas j'ai eu a modifier uniquement la partie electron, afin d'accélérer les start/restart je lançais une fois unique start puis relançais uniquement la partie electron.
- pack : Permet d'obtenir uniquement le dossier contenant la solution compiler.
- dist : Permet via la configuration de l'étape 2 de compiler vos fichier (par défault .snap pour linux, .exe pour windows et .appImage pour mac)
- distStartup : Permet en une commande de build les composant ainsi que le client electron.

### 4. electron.js

Je vous fournis une version simplifier de mon fichier electronJs les commentaire sont intégrer dans le code fournis, si vous souhaitez mettre en place un système plus complet avec un icon tray, veuillez a vous référer a mon code.

Le code electron.js est placer dans mon dossier public afin d'éviter que celui ci sois modifier, ne compter pas sur du TypeScript pour celui ci.

```js title="/public/electron.js"
  const electron = require("electron");
  const { app, BrowserWindow } = electron;
  const isDev = require("electron-is-dev");
  const Server = require('../BuildServer/index') // permet de lancer le serveur aux démarrage
  const path = require("path");
  let mainWindow;
  const BaseFolder = path.join(__dirname);
  const icon = path.join(BaseFolder,"toolbox.png");

  const createWindow = ({showOnLoad = true}={}) => {
    if(mainWindow){
      mainWindow.focus();
      return;
    }
    mainWindow = new BrowserWindow({
      width: 1280, // Permet de définir la taille de la fenêtre
      height: 720,
      autoHideMenuBar : true, // Permet de cacher la barre de menu intégrer a electron
      icon : icon // L'icon de la fenêtre électron
    });
    mainWindow.loadURL(
      isDev ?
        "http://localhost:3000" : // Le serveur de dev local
        "http://localhost:5000"   // Le serveur de production
    )
    mainWindow.once("ready-to-show",()=>{
      if(showOnLoad) mainWindow.show(); //si on veux montrer la fenêtre aux démarrage
    })
    mainWindow.once("closed", () => (mainWindow = null)); // si la fenêtre est fermer on vide mainWindow
  }

  const init = () => {
    app.on("window-all-closed", (e) => e.preventDefault()); // evite que toute la solution sois fermer si toute les fenêtre sont fermer.
  };
  app.requestSingleInstanceLock() ? init() : app.quit(); // Evite d'avoir deux fois le serveur démarrer
  app.on("second-instance", () => mainWindow.show()); // montre la fenêtre si la solution est démarrer deux fois

  app.on("ready",()=>{
    if (mainWindow === null) {
      createWindow(); // si aucune fenêtre en créer une.
    }
  })

  app.on("activate", () => {
    if (mainWindow === null) {
      createWindow(); // si aucune fenêtre en créer une.
    }
  });
```

### How It Work

```plantuml
  actor user
  node Electron {
    node Serveur
    node Client
  }
  user -u-> Electron : 1.Lance la solution
  Serveur -[#black]-> Client : Expose le contenue static
  Serveur -[#black]-> Serveur : Expose l'Api
  Electron --> Serveur : 2.Lance le serveur
  Serveur -[#black]-> Electron : Expose le contenue web
  Electron --> user : 3.Ouvre une fenêtre "Native" affichant le client
```

Lors du démarrage de notre solution notre electron va démarrer notre serveur web, celui ci intègre une partie statique qui n'est autre que notre client ainsi qu'une partie Api.

#### Pourquoi Electron et pas React-Native

React native et Electron n'ont pas le même objectif.

React native vise les appareille Android et Ios contrairement a Electron qui vise les Ordinateur.

