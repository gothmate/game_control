### Esse é um projeto para registro de jogos de Boardgames.
Possui 4 endpoints (/, /games, /players, /playing)

- ### HOME ###
    - Na home, são mostradas informações do último jogo.

- ### Games ### 
    - Aqui fica o registro dos jogos.
    - Nome do jogo, quantidade máxima de jogadores e tipo de jogo
    - Nesse endpoint também são mostrados os jogos já registrados e suas performances.

- ### Players ###
    - Aqui fica o registro de jogadores
    - O endpoint mostra a performance dos jogadores.

- ### Playing ###
    - Aqui você registra o início de uma partida
    - primeiro escolha o jogo
    - quantas pessoas vão jogar
    - quem serão os jogadores
    - Na área de Iniciar Sessão, clique em "Iniciar" para o cronômetro iniciar a contagem
    - Quando o jogo terminar, clique em "Pausar" para poder selecionar o vencedor.
    - Depois clique em "Finalizar jogo". (estamos com um pequeno bug, onde para registrar fim de partide precisa clicar uma segunda vez).

Quando você volta para a Home, verá o registro do jogo, que será adicionado aos dados separedos dos jogadores e dos boardgames registrados.

Os registros são feitos de forma simples em arquivos JSON, sem necessidade de um serviço de Banco de Dados e podem ser alterados manualmente, caso você conheça a estrutura JSON.

## CLONE
Ao clonar esse repositório, use o comando "npm install" para adicionar as dependências e dopois "npm run build" para buildar sua versão final.
Para rodar o projeto basta abrir o terminal ou seu editor de código e digitar "npm start"
