---
title: Pipeline
slug : /pipeline
---

Deux pipeline on été mise en place pour répondre a trois objectif :

- La pipeline principale :
  - S'assurer que la solution sois capable de compiler en cas de push.
  - Compiler la solution sur plusieurs plateforme en cas de Tag.
- La pipeline secondaire :
  - Déployer la documentation

A terme une troisième Pipeline seras mise en place, Celle ci aura pour but de déployer en cas de tag une nouvelle version du serveur en production.

Chaque Pipeline est mise en place via le système Github Action.

```plantuml pipelinePrincipal
  actor You
  node GithubAction
  node Github
  You--> Github : Effectue un commit
  Github --> GithubAction : Demande l'exécution de la pipeline
  GithubAction --> GithubAction : Compile la solution pour Linux, Windows et peu être mac (si les Action ne sont pas en surcharge)
  GithubAction --> Github : Retourne les résultat de compilation en cas de Tag et créer un brouillon de release
```
