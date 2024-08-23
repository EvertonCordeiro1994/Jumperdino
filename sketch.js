let cont = 0, score = 0, jumpStartTime = 0, velocidade = 10

let walk = [], run = [], jump = [], dead = []

const deslocamento = {
  pedra_01: 0,
  pedra_02: 240
}

const tela = {
  width: window.innerWidth,
  height: window.innerHeight
}

const dino = {
  xPos: 50,
  yPos: 410,
  width: 180,
  height: 180,
  move: 'walk'
}

const rock = {
  img: null,
  xPos: tela.width - 150,
  yPos: 500,
  width: 80,
  height: 80
}

const chao = {
  img: null,
  xPos: 50,
  yPos: 570,
  width: 80,
  height: 100
}

const fundo = {
  img: null,
  xPos: 0,
  yPos: 0,
  width: 1400,
  height: tela.height + 150
}

const assinatura = {
  img: null,
  xPos: tela.width - 300,
  yPos: 15,
  width: 250,
  height: 20
}

const pulo = {
  frames: 12,
  duracao: 0.9,
  altura: 100
}

function preload() {
  for (let i = 1; i <= 10; i++) {
    walk.push(loadImage(`images/dino/walk/Walk(${i}).png`))
  }
  for (let i = 1; i <= 8; i++) {
    run.push(loadImage(`images/dino/run/run(${i}).png`))
  }
  for (let i = 1; i <= 12; i++) {
    jump.push(loadImage(`images/dino/jump/jump(${i}).png`))
  }
  for (let i = 1; i <= 8; i++) {
    dead.push(loadImage(`images/dino/dead/Dead(${i}).png`))
  }

  rock.img = loadImage('images/cenario/obstaculos/rock.png')
  chao.img = loadImage('images/cenario/floor.jpg')
  fundo.img = loadImage('images/cenario/bg-02.jpg')
  assinatura.img = loadImage('images/assinatura.png')
}

function handleJump() {
  const elapsedTime = (millis() - jumpStartTime) / 1000
  const progress = elapsedTime / pulo.duracao
  const jumpProgress = Math.sin(progress * Math.PI)

  dino.yPos = 410 - (pulo.altura * jumpProgress)

  const jumpFrame = Math.floor(progress * pulo.frames) % pulo.frames
  image(jump[jumpFrame], dino.xPos, dino.yPos, dino.width, dino.height)

  if (progress >= 1) {
    dino.move = 'walk'
    dino.yPos = 410
  }
}

function drawFloor() {
  for (let i = 0; i < tela.width; i += chao.width) {
    image(chao.img, i, chao.yPos, chao.width, chao.height)
  }
}


function startJump() {
  dino.move = 'jump'
  jumpStartTime = millis()
}

function setup() {
  createCanvas(tela.width, tela.height)
  frameRate(15)

  document.addEventListener('keydown', function (event) {
    if ((event.key === 'ArrowUp' || event.key === ' ') && dino.move !== 'jump') {
      startJump()
    }
  })

  document.addEventListener('touchstart', function () {
    if (dino.move !== 'jump') {
      startJump()
    }
  })
}

function gerarPedras() {
  image(rock.img, (tela.width - deslocamento.pedra_01), rock.yPos, rock.width, rock.height)
  image(rock.img, (tela.width - deslocamento.pedra_02), rock.yPos, rock.width, rock.height)

  if (tela.width - deslocamento.pedra_01 <= -rock.width) {
    deslocamento.pedra_01 = Math.floor(Math.random() * 200) - tela.width
  }

  if (tela.width - deslocamento.pedra_02 <= -rock.width) {
    deslocamento.pedra_02 = Math.floor(Math.random() * 200) - tela.width
  }
}

function movimentoDino(m) {
  const setMove = [walk, jump, dead, run]

  if (dino.move === 'walk') {
    cont = (cont + 1) % setMove[m].length
    image((setMove[m])[cont], dino.xPos, dino.yPos, dino.width, dino.height)
  } else if (dino.move === 'jump') {
    handleJump()
  }
}

const telaDeFundo = () => {
  image(fundo.img, fundo.xPos, fundo.yPos, fundo.width, fundo.height)
}

const header = () => {
  fill('black')
  text(`Score: ${score}`, 20, 30)
  image(assinatura.img, assinatura.xPos, assinatura.yPos, assinatura.width, assinatura.height)
}



function draw() {

  deslocamento.pedra_01 += velocidade
  deslocamento.pedra_02 += velocidade

  telaDeFundo()
  header()

  movimentoDino(0)
  gerarPedras()
  drawFloor()

}
