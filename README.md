# SoundBoard

Projet de soundboard afin de me familiariser avec certain package :

## SoundBoard ?

Une sound board c'est quoi ? Une Sound board est une table non pas de mixage mais d'effet sonore.

L'objectif est simple :

    -> Afficher une liste d'effet sonore
    -> Modificateur de voix ? V2 webRTC
    -> Déclencher ces effet sois via une page web sur l'ordinateur sois sur son smartphone
    -> Avoir un serveur local qui contiendrais la solution et qui jouerais les son sur le poste en utilisant le micro
    => L'intérêt est de pouvoir appliquer les effet sonore sur discord
    -> Ajouter des effet sonore
    -> Avoir un lien avec Spotify
    -> Dans une V2 un lien avec Deezer/SoundCloud
    -> Un système de plugin audio (permet l'ajout de fonctionnalité en fonctionnement et une gestion de l'activation ou non)
    => Pour les plugin :
        => Contrôle via discord
        => Contrôle via des raccourci clavier

=> <https://www.myinstants.com/categories/sound%20effects/> recense des son

=> <https://alemangui.github.io/pizzicato/> a approfondir

## Mise en oeuvre

L'objectif serais d'émettre des sons sur un input audio que discord ou un autre peux capturer.

### Mappage

- / => Le client de l'app (react)

    /api => Api avec le framework Koa

    /io => Socket .io permet le temps réel

## Configuration

### UI

- Axios : Fortement conseiller, je n'ai encore jamais eu le courage de passer le cap
- React : Package que j'aime beaucoup et que je souhaite approfondir
- Redux : Comme pour React
- Typescript : Version d'un js typer qui me fait TRES ENVIE
- Socket .io : Pas utiliser depuis un moment
- Tailwind

### BackEnd

- Koa : Alternative a Express dont on ne ma dis que du bien

  - Koa router
  - Koa Body
  - Koa Static
  - Koa Mount

- Typescript
- Socket.io : Pas utiliser depuis un moment

### Général

- Yarn

### Build/Watch

    - Server
      - Watch (S:DevWatch)
        => S:Build : Cli type script + -w (Watch) + --projet Configuration spécifique aux build du serveur)
        => S:Watch : nodemon + -w (surveille un dossier précis) + Fichier a exécuter
      - Build (S:ProdBuild)
        => cli type script avec configuration sans -w
    - Client
      - Watch (start)
        => craco start (fichier de configuration spécifique a craco)
      - Build (build)
        => craco build (fichier de configuration spécifique a craco)
    - Général
      - watch (watch)
        => concurrently + --names (les alias de chaque commande) + -c (les couleur attribuer aux log de chaque commande) + les commande
      - build
        => Pas encore définis

### Useful Link

  https://discordjs.guide/creating-your-bot/#creating-the-bot-file

  https://discord.com/developers/

  https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md

  https://animejs.com/documentation/#gridAxisStaggering

  Voice :

  https://discordjs.guide/voice/the-basics.html#joining-voice-channels

  https://discordjs.guide/voice/understanding-voice.html#understanding-voice
