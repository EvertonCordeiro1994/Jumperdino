let walk = [], run = [], jump = [], dead = [];
let cont = 0, deslocamento = 0;
let dinoPositionX = 50, dinoPositionY = 408;
let dinoWidth = 180, dinoHeight = 180;
let move = 'walk';
let floor,bg,rock,tree,jumpStartTime,assinatura;

const jumpFrames = 12, jumpDuration = 0.9, jumpHeight = 200; 

function preload() {
  for (let i = 1; i <= 10; i++) {
    walk.push(loadImage(`images/dino/walk/Walk(${i}).png`));
  }
  for (let i = 1; i <= 8; i++) {
    run.push(loadImage(`images/dino/run/run(${i}).png`));
  }
  for (let i = 1; i <= 12; i++) {
    jump.push(loadImage(`images/dino/jump/jump(${i}).png`));
  }
  for (let i = 1; i <= 8; i++) {
    dead.push(loadImage(`images/dino/dead/dead(${i}).png`));
  }

  floor = loadImage('images/cenario/floor.jpg');
  bg = loadImage('images/cenario/bg-02.jpg');
  rock = loadImage('images/cenario/obstaculos/rock.webp')
  tree = loadImage('images/cenario/obstaculos/tree.png')
  assinatura =  loadImage('images/assinatura.png')
  
}

function handleJump() {
  let elapsedTime = (millis() - jumpStartTime) / 1000; 
  let progress = elapsedTime / jumpDuration; 
  let jumpProgress = Math.sin(progress * Math.PI); 

  dinoPositionY = 408 - (jumpHeight * jumpProgress);

  let jumpFrame = Math.floor((elapsedTime / jumpDuration) * jumpFrames) % jumpFrames;
  image(jump[jumpFrame], dinoPositionX, dinoPositionY, dinoWidth, dinoHeight);

  if (progress >= 1) {
    move = 'walk';
    dinoPositionY = 408; 
  }
}

function drawFloor() {
  for (let i = 0; i < window.innerWidth; i += 80) {
    image(floor, i, 570, 80, 100);
  }
}

function drawTree(deslocamento){
  image(tree,window.innerWidth - deslocamento,408,60,180)
}
function drawRock(deslocamento){
  image(rock,window.innerWidth - deslocamento,516,80,80)
}

function startJump() {
  move = 'jump';
  jumpStartTime = millis();
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(15); 

  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp' && move !== 'jump') {
      startJump();
    }
  });

  document.addEventListener('touchstart', function(event) {
    if (move !== 'jump') {
      startJump();
    }
  });
}

function draw() {
  deslocamento += 10

  background('black');
  image(bg,0,0,1400, window.innerHeight+120)
  image(assinatura, window.innerWidth - 300, 15,250,20 )

  if (move === 'walk') {
    cont = (cont + 1) % walk.length;
    image(walk[cont], dinoPositionX, dinoPositionY, dinoWidth, dinoHeight);
  } else if (move === 'jump') {
    handleJump();
  }


  fill('white');
  text(`${cont}`, 50, 50);

  fill('red');
  text(`${window.innerWidth}`, 150, 50);
  fill('green');
  text(`${window.innerHeight}`, 250, 50);

  drawTree(deslocamento)
  drawRock(deslocamento)

  drawFloor();
}
