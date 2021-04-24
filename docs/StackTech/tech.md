---
title: Tech
slug : /tech
---

### L'ancienne version

Chaque composant sont interconnecter. Le passage d'une techno a une autre est rendu plus compliquer.

```plantuml V1
node client{
  component Redux
  component React
  component Socket_io_client
}

node serveur{
  component socket_io_serveur
  component koa
  component DiscordJs
  component Koa_Static_client
  component Store
  component Db
}

React <--> Redux
Socket_io_client <--> Redux

koa <--> socket_io_serveur
koa <--> DiscordJs
koa <--> Store
koa <--> Db
koa <--> Koa_Static_client
Db <--> Store
Db <--> DiscordJs
socket_io_serveur <--> DiscordJs
socket_io_serveur <--> Store
socket_io_serveur <--> Db

client --> serveur : Axios
serveur --> client : Socket.io
```

### Futur version

Redux devient le centre du projet, certes le remplacement de redux devient impossible mais celle des autre composant deviendrait assez facile.

L'activation/désactivation de fonctionnalité deviens aussi facile. Une condition et cella est effectuer.

Les état globaux permette aussi l'activation d'désactivation des fonctionnalité.

Les ligne verte sont des connection via fonction dispatch et récupération des états globaux. Le dispatch ainsi que le getState sont fournis par l'api Redux.

Les ligne noir représente des composant (DiscordJsHandler dépend de DiscordJs, etc).

```plantuml V2
node node[
  Vert = dispatch + state
  Rouge = Emission d'event
  Black = Is part of
]

node client{
  component Redux
  component React
  component Socket_io_client
}

node serveur{
  component ReduxServeur as rs
  component socket_io_serveur
  component Store
  component koa
  agent koa_Api
  component DiscordJs
  agent DiscordBot
  component DiscordJsVoiceHandler as dsv
  component Koa_Static_client
  component Db
}

rs <-[#Green]-> Db
rs <-[#Green]-> Store
rs <-[#Green]-> koa
rs <-[#Green]-> DiscordBot
rs <-[#Green]-> DiscordJs
koa -[#Black]-> Koa_Static_client : Affiche l'interface
Koa_Static_client --> client
koa <-[#Black]-> koa_Api
rs <-[#Green]-> dsv
DiscordJs <-[#Black]-> DiscordBot
DiscordJs <-[#Black]-> dsv
rs -[#Red]-> socket_io_serveur : Emit des event

React <--> Redux
Socket_io_client <--> Redux
Redux--> koa_Api : Appelle via Axios


socket_io_serveur -[#Red]-> Socket_io_client

```
