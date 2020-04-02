# PO Sample App Conference

> **Importante**: Este aplicativo está em processo de migração da versão 3 para a versão 5 do Ionic.

PO Sample App Conference é um aplicativo de demonstração do PO Sync baseado no [Ionic Conference Application](https://github.com/ionic-team/ionic-conference-app).
. Tendo como objetivo principal, demonstrar as funcionalidades do PO Sync de forma didática.

> Por esta razão, alguns exemplos aqui demonstrados, como a autenticação do usuário, foram implementados apenas de forma demonstrativa não implementando todas as validações de segurança, por exemplo.

## Sobre o PO Sync

O PO Sync é uma biblioteca que possibilita armazenar dados na aplicação local mantendo a sincronização entre os dados locais e o servidor. Permitindo que o usuário utilize a aplicação tanto online quanto offline, com a mesma experiência de uso.

Para saber mais sobre o PO Sync, veja em:
 - [Começando com o PO Sync](https://po-ui.io/guides/sync-get-started) 
 - [Fundamentos do PO Sync](https://po-ui.io/guides/sync-fundamentals).

## Estrutura do PO Sync no aplicativo

As funcionalidades do PO Sync foram isoladas em serviços com exceção dos métodos para fazer a sincronização. Dessa forma, os componentes do aplicativo concentram-se apenas na busca do serviço e nas manipulações dos dados na tela.

Também foi adicionado um [Angular resolver](https://angular.io/api/router/Resolve), para poder aguardar a preparação do PO Sync
antes da ativação das rotas do aplicativo.
Esta funcionalidade está disponível em:
 - [src/app/resolvers/sync-resolver.ts](src/app/resolvers/sync-resolver.ts)
 - [src/app/app-routing.module.ts](src/app/app-routing.module.ts)
 - [src/app/schedule/schedule.component.ts](src/app/schedule/schedule.component.ts)

## Funcionalidades adicionadas

A seguir, tem-se uma lista de funcionalidades do PO Sync utilizadas no aplicativo e onde podem ser encontradas.

### Preparando a aplicação para a sincronização:

- `PoSyncService.prepare()`:
  - [src/app/services/prepare-sync.service.ts](./src/app/services/prepare-sync.service.ts#L26)

### Fazendo a carga inicial do dados:

- `PoSyncService.loadData()`:
  - [src/app/services/prepare-sync.service.ts](./src/app/services/prepare-sync.service.ts#L47)


### Manipulando os registros de um schema:

- `PoSyncService.getModel()`:
  - [src/services/conference.service.ts](./src/services/conference.service.ts#L17)
  - [src/services/lecture.service.ts](./src/services/lecture.service.ts#L16)
  - [src/services/track.service.ts](./src/services/track.service.ts#L13)

- `PoEntity.find()`:
  - [src/services/lecture.service.ts](./src/services/lecture.service.ts#L22)
  - [src/services/track.service.ts](./src/services/track.service.ts#L13)

- `PoEntity.findById()`:
  - [src/services/lecture.service.ts](./src/services/lecture.service.ts#L16)

- `PoEntity.findOne()`:
  - [src/services/conference.service.ts](./src/services/conference.service.ts#L10)

- `PoQueryBuilder.exec()`:
  - [src/services/conference.service.ts](./src/services/conference.service.ts#L10)
  - [src/services/lecture.service.ts](./src/services/lecture.service.ts#L24)
  - [src/services/track.service.ts](./src/services/track.service.ts#L13)

- `PoQueryBuilder.sort()`:
  - [src/services/lecture.service.ts](./src/services/lecture.service.ts#L23)

### Notificação pós-sincronização:

- `PoSyncService.onSync()`:
  - [src/pages/lecture-detail/lecture-detail.component.ts](./src/pages/lecture-detail/lecture-detail.component.ts#L37)
  - [src/pages/schedule-filter/schedule-filter.component.ts](./src/pages/schedule-filter/schedule-filter.component.ts#L35)
  - [src/pages/schedule/schedule/component.ts](./src/pages/schedule/schedule.component.ts#L44)

### Sincronização manual:

- `PoSyncService.sync()`:
  - [src/services/lecture.service.ts](./src/services/lecture.service.ts#L29)
  - [src/services/track.service.ts](./src/services/track.service.ts#L18)

### Criação dos schemas:

Os schemas foram colocados em arquivos separados como constantes no diretório: `src/schemas`. Todos os schemas foram importados para o arquivo `src/schemas/schemas-list.constants.ts` e adicionado ao array `schemas`. Sendo esta constante, o parâmetro que representa os schemas no método `PoSync.prepare`.

### PO Storage:

- `PoStorageService.set()`:
  - [src/app/services/prepare-sync.service.ts](./src/app/services/prepare-sync.service.ts#L50)
