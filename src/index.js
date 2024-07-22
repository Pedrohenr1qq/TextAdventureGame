const Fase_1 = require('./Fases/fase_1');
const Guerreiro = require('./Personagens/Heroi/Guerreiro');

const fase_1 = new Fase_1();
const guerreiro = new Guerreiro();

fase_1.apresentarFase();
fase_1.encontroComMonstro(0, guerreiro);
if(!fase_1.gameOver) fase_1.encontroComMonstro(1, guerreiro);
fase_1.fimDaFase();

