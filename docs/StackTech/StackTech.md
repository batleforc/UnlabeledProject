---
title: Stach technique
slug : /stacktechnique
---

Lors de la conception de ce projet le point le plus important est et reste la découverte de nouveaux Framework/Techno .

Voici les technos en apprentissage :

- TypeScript ( Un JavaScript avec du style et du type )
- Axios ( Framework pour les requêtes html )
- Tailwind ( Framework CSS )
- Koa ( Framework de serveur http )
- Yarn ( Gestionnaire de packages )
- Electron ( Framework de packages d'application sous un format natif )
- Better-sqlite3 devenue sqlite + sqlite3 (Framework de Base de donnée locale)

Les technos en approfondissement :

- React ( Framework d'Interface )
- Redux ( Framework de gestion d'état )
- Socket.io ( Framework d'event en temps réel )
- NodeJs ( Plateforme libre JavaScript orientée application )

A l'origine le projet était sous le format :

```plantuml A l'origine des temps
card Yarn{
  node Client [
    Client
    ----
    TypeScript
    React
    Redux
    TailWind
    Axios
    Socket.io
  ]
  node BackEnd [
    BackEnd
    ----
    Typescript
    NodeJs
    Koa
    Socket.io
    BetterSqlite3
  ]
}
BackEnd <-r- Client : Axios
BackEnd --> Client : Socket.io
```

Puis un jour Electron Arriva :

```plantuml A l'origine des temps
card Yarn{
  node Electron{
    node Client [
      Client
      ----
      TypeScript
      React
      Redux
      TailWind
      Axios
      Socket.io
    ]
    node BackEnd [
      BackEnd
      ----
      Typescript
      NodeJs
      Koa
      Socket.io
      sqlite3
    ]
  }
}
BackEnd <-r- Client : Axios
BackEnd --> Client : Socket.io
```

Un tout petit changement de stack me direz vous ? Et bien non, un énorme en réalité.

Prêt pour la suite ?

=> [Mise en place Electron](/docs/electron)

=> [Mise en place de l'environnement de base](/docs/setup)

=> [Mise en place d'une pipeline](/docs/pipeline)
