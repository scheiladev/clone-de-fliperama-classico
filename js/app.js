// Inimigos que nosso jogador deve evitar
class Enemy {
    constructor(x, y, speed, sprite) {
        // As variáveis aplicadas a nossas instâncias entram aqui.
        // Fornecemos uma a você para que possa começar.
        // Posição e velocidade dos inimigos
        this.x = x;
        this.y = y;
        this.speed = speed;

        // A imagem/sprite de nossos inimigos, isso usa um
        // ajudante que é fornecido para carregar imagens
        // com facilidade.
        this.sprite = sprite;
    }

    // Atualize a posição do inimigo, método exigido pelo jogo
    // Parâmetro: dt, um delta de tempo entre ticks
    update(dt) {
        // Você deve multiplicar qualquer movimento pelo parâmetro
        // dt, o que garantirá que o jogo rode na mesma velocidade
        // em qualquer computador.
        this.x += this.speed * dt;

        // Se a posição do inimigo estiver fora dos limites da tela
        // a velocidade será calculada de modo randômico
        if (this.x >= 505) {
            this.x = -101;
            this.speed = 100 + Math.floor(Math.random() * 222);
        }

        // Verifica se houve colisão entre o jogador e os inimigos
        // comparando a posição do jogador em relação ao inimigo
        if (player.x < this.x + 80 && 
            player.x + 80 > this.x &&
            player.y < this.y + 60 &&
            60 + player.y > this.y) {
                player.x = 202;
                player.y = 405;
        }
    }

    // Desenha o inimigo na tela, método exigido pelo jogo
    render() { 
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(), 
// um render() e um handleInput().

class Player {
    // Construtor do jogador com a posição inicial
    // x (horizontal) e y (vertical) e a imagem do jogador
    constructor(x, y,sprite) { 
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    // Atualiza a posição do jogador, método exigido pelo jogo
    update(dt) {

    }

    // Desenha o jogador na tela
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Controla os movimento das teclas pressionadas
    handleInput(kp) {

        // Movimenta o jogador na horizontal para a esquerda
        // Não permite que o jogador ultrapasse o limite esquerdo da tela
        if (kp == 'left' && this.x > 0) {
            this.x -= 102;
        }

        // Movimenta o jogador na horizontal para a direita
        // Não permite que o jogador ultrapasse o limite direito da tela
        if (kp == 'right' && this.x < 405) {
            this.x += 102;
        }
        
        // Movimenta o jogador na vertical para cima
        if (kp == 'up' && this.y > 0) {
            this.y -= 83;
        }

        // Movimenta o jogador na vertical para baixo
        // Não permite que o jogador ultrapasse o limite inferior da tela
        if (kp == 'down' && this.y < 405) {
            this.y += 83;
        }

        // Verifica se o jogador chegou na água
        // e o coloca novamente na posição inicial
        if (this.y < 0) {
            setTimeout(() => {
                this.x = 202;
                this.y = 405;
                alert('Você venceu! Pressione OK para jogar novamente');
            }, 600);
        }
    }
}

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimigos numa array allEnemies
const allEnemies = [
    new Enemy(0, 63, 200, 'images/enemy-bug.png'),
    new Enemy(0, 147, 200, 'images/enemy-bug.png'),
    new Enemy(0, 230, 200, 'images/enemy-bug.png')
];

// Coloque o objeto do jogador numa variável chamada player.
const player = new Player(202, 405, 'images/char-pink-girl.png');

// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
