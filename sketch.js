let walk = [], run = [], jump = [], dead = [];
let cont = 0;
let dinoPositionX = 10, dinoPositionY = 408;
let dinoWidth = 180, dinoHeight = 180;
let move = 'walk';
let floor;

let jumpFrames = 12, jumpDuration = 0.9, jumpHeight = 200, jumpStartTime; 


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

  floor = loadImage('images/cenario/floor.jpg')
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(15); 

  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp' && move !== 'jump') {
      move = 'jump';
      jumpStartTime = millis();
    }
  });
}

function draw() {
  background('black');

  if (move === 'walk') {
    cont = (cont + 1) % walk.length;
    image(walk[cont], dinoPositionX, dinoPositionY, dinoWidth, dinoHeight);
  } else if (move === 'jump') {
    let elapsedTime = (millis() - jumpStartTime) / 1000; 
    let progress = elapsedTime / jumpDuration; 
    let jumpProgress = Math.sin(progress * Math.PI); 

    dinoPositionY = 470 - (jumpHeight * jumpProgress);

    let jumpFrame = Math.floor((elapsedTime / jumpDuration) * jumpFrames) % jumpFrames;
    image(jump[jumpFrame], dinoPositionX, dinoPositionY, dinoWidth, dinoHeight);

    if (progress >= 1) {
      move = 'walk';
      dinoPositionY = 470; 
    }
  }

  fill('white');
  text(`${cont}`, 50, 50);

  fill('red');
  text(`${window.innerWidth}`, 150, 50);
  fill('green');
  text(`${window.innerHeight}`, 250, 50);


  for (let i = 0; i <= window.innerWidth; i += 80) {
    image(floor, i, 570, 80, 100);
  }
}
