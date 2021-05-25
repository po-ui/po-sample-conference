# PO SAMPLE CONFERENCE

Esse repositório tem como objetivo, disponibilizar um exemplo de uma arquitetura para dispositivos móveis. Aqui você pode encontrar exemplos de utilização do **PO-UI**, **PO-Sync** e **PO-Storage**, e usá-los como referência para suas aplicações.

> Este repositório e suas aplicações estão **em desenvolvimento** e ainda **não estão disponíveis** todas as funcionalidades.

No exemplo, a aplicação web funciona como um portal para o administrador da conferência, onde ele pode cadastrar, atualizar ou remover os palestrantes e as palestras. Já no aplicativo móvel, o usuário além de poder acompanhar quem são os palestrantes e a agenda de palestras, ele pode adicionar, alterar ou remover notas sobre uma determinada palestra. Todas essas informações ficam armazenadas na API, comum as duas aplicações.

## Pré-requisitos:

Para executar as aplicações é necessário realizar as seguintes instalações:
 - [NodeJS](https://nodejs.org/en/);
 - [Angular](https://angular.io/guide/quickstart);
 - [Ionic](https://ionicframework.com/getting-started)

## Executando a api

```console
$ cd po-sample-api-conference
$ npm install
$ npm run start
```

## Executando a aplicação web

```console
$ cd po-sample-web-conference
$ npm install
$ ng serve
```

> Caso utilizar a versão 7 do npm pode ocorrer erro de versão das dependências, neste caso utilize `npm install --legacy-peer-deps`

## Executando a aplicação mobile

```console
$ cd po-sample-app-conference
$ npm install
$ ionic serve
```

> Caso utilizar a versão 7 do npm pode ocorrer erro de versão das dependências, neste caso utilize `npm install --legacy-peer-deps`

> Não será possível testar a aplicação com a API pois a mesma encontra-se em fase de desenvolvimento.

## Links úteis:

- Para saber mais sobre o **po-ui**, acesse [documentação do po-ui](https://po-ui.io);
- Para saber mais sobre o **po-sync**, acesse [começando com o po-sync](https://po-ui.io/guides/sync-get-started);
- Para saber mais sobre o **po-storage**, acesse [documentação do po-storage](https://po-ui.io/documentation/po-storage)