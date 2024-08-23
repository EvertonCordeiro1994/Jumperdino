let cont = 0, score = 0, velocidade = 10, deslocamentoRock01 = 0, deslocamentoRock02 = 0
let walk = [], run = [], jump = [], dead = []

const dino = {
  xPos: 50,
  yPos: 410,
  width: 180,
  height: 180,
  move: 'walk'
}

const rock = {
  img: null,
  xPos: window.innerWidth - 150,
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
  height: window.innerHeight + 120
}

const assinatura = {
  img: null,
  xPos: window.innerWidth - 300,
  yPos: 15,
  width: 250,
  height: 20
}

const pulo = {
  frames: 12,
  duracao: 0.9,
  altura: 100
}

let move = 'walk'
let jumpStartTime = 0

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
    move = 'walk'
    dino.yPos = 410
  }
}

function drawFloor() {
  for (let i = 0; i < window.innerWidth; i += 80) {
    image(chao.img, i, chao.yPos, chao.width, chao.height)
  }
}

function drawRock(xPos) {
  image(rock.img, xPos, rock.yPos, rock.width, rock.height)
}

function startJump() {
  move = 'jump'
  jumpStartTime = millis()
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  frameRate(15)

  document.addEventListener('keydown', function (event) {
    if ((event.key === 'ArrowUp' || event.key === ' ') && move !== 'jump') {
      startJump()
    }
  })

  document.addEventListener('touchstart', function () {
    if (move !== 'jump') {
      startJump()
    }
  })
}   

function checkCollision(xPos , yPos) {
  return (
    dino.xPos == xPos + rock.width &&
    dino.xPos + dino.width == xPos &&
    dino.yPos + dino.height == yPos &&
    dino.yPos == yPos + rock.height
  )
}

function draw() {
  deslocamentoRock01 += velocidade
  deslocamentoRock02 += velocidade

  background('black')

  image(fundo.img, fundo.xPos, fundo.yPos, fundo.width, fundo.height)
  image(assinatura.img, assinatura.xPos, assinatura.yPos, assinatura.width, assinatura.height)
  
  fill('white')
  text(`Score: ${score}`, 50, 50)

  if (move === 'walk') {
    cont = (cont + 1) % walk.length
    image(walk[cont], dino.xPos, dino.yPos, dino.width, dino.height)
  } else if (move === 'jump') {
    handleJump()
  }

  drawRock(window.innerWidth - deslocamentoRock01)
  drawRock(window.innerWidth - deslocamentoRock02)

  if (window.innerWidth - deslocamentoRock01 <= -rock.width) {
    deslocamentoRock01 = Math.floor(Math.random() * 200) - window.innerWidth
  }

  if (window.innerWidth - deslocamentoRock02 <= -rock.width) {
    deslocamentoRock02 = Math.floor(Math.random() * 200) - window.innerWidth
    
  }




  drawFloor()
}
