let dx = 10;
let dy = 0;
let morsel_y;
let morsel_x;
let score = 0;
let gameFin = false



const startBtn = document.querySelector('.startBtn')
//startBtn.addEventListener('click', startGame)
//hardcoded position, couldnt figure out how to randomize position for each piece
let snake = [  {x: 120, y: 10},  {x: 110, y: 10},  {x: 100, y: 10},  {x: 90, y: 10},  {x: 80, y: 10},];


const snakeboard = document.getElementById("serpentBoard");
const snakeboardCtx = serpentBoard.getContext("2d");
//startGame();
createMorsel();




document.addEventListener("keydown", moveChange);
//document.addEventListener("click", startGame);




function startGame(){
  setTimeout(startGame, 100)

  directionChange = false;
  //setTimeout(function onTick(){
  clearCanvas();
  drawMorsel();
  snakeLikeMovement();
  drawSnake();
  // variable gameFin = true, runs process to reset the window
  if (gameFin) {
    if(confirm('You lose. Press ok to restart!')) {
      window.location = '/'
      }
  }
  gameOver()
    
  // }, 100)
}
const boardBorder = 'black';
const boardBackground = 'deeppink';
// default canvas with const variables for board scheme
function clearCanvas() {
  //fills style and stroke based on the color inputted in the variables for boardbackground and border
  snakeboardCtx.fillStyle = boardBackground;
  snakeboardCtx.strokestyle = boardBorder;
  //fills as big as the sie f the canvas, 500 x 500
  snakeboardCtx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  snakeboardCtx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

//draws all pieces of the snake
function drawSnake(){  
  snake.forEach(drawSnakePart);
}
//draws each part of the snake
function drawSnakePart(snakePart) 
{  
  //adds style with the color light sea green to be inputted in fillrect
  snakeboardCtx.fillStyle = '20b2aa';  
  //fillrect adds the color to the rectangle(s) created, last to numbers are the height and widthe of the rectangles/parts
  // increasing the sizes distorts the distance of the parts, need to look up how to fix, maybe change the positions of each part
  snakeboardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);  
  snakeboardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
 //draws the fruit/snack usuing same context methods
 //rectangle
function drawMorsel(){
  snakeboardCtx.fillStyle = 'orange';
  //changed the size of the rectangle for the snack so it is easier to see, but the hit box is off now, still works, need to fid out why
  snakeboardCtx.fillRect(morsel_x, morsel_y, 18, 18);
  snakeboardCtx.strokeRect(morsel_x, morsel_y, 18, 18);
  
  //tried to make the fruit circular but didnt work, need to look it up  
  // snakeboardCtx.beginPath(morsel_x, morsel_y, 18, 18);
  // snakeboardCtx.arc(100, 75, 50, 0, 2 * Math.PI);
  // snakeboardCtx.stroke();
}

// randomly generates a snack at a random position on the canvas
function randoMorsel (min, max) {
  //Math.round rounds the decimal to a full number, 
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function createMorsel() {
  morsel_x = randoMorsel(0, snakeboard.width - 10);
  morsel_y = randoMorsel(0, snakeboard.height - 10);
  snake.forEach(function snkAteMorsel(part) {
    const morselEaten = part.x == morsel_x && part.y == morsel_y;
    if (morselEaten) createMorsel();
  });

}

function snakeLikeMovement(){
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  //adds new head to snake
  snake.unshift(head);
  //serEatenMor = if the postion of the snake head intercepts the fruit(morsel) adds to score
  const serEatenMor = snake[0].x === morsel_x && snake[0].y === morsel_y;
  if (serEatenMor){
    score += 1;
    document.getElementById('score').innerHTML =score;
    //runs function and creates new morsel at new position
    createMorsel();
  } else{
    //removes last position of the snake
    snake.pop();
  }
}

// input movement for the snake/user
function moveChange(event) {
  // looked up keycodes for the inputs, gave the const since they will never change
  const leftIn = 37;
  const rightIn = 39;
  const upIn = 38;
  const downIn = 40;
  
  if (directionChange) return;
  directionChange = true;
  // if the input of any arrow is clicked, the snakes positon will change within the x and y axis
  const dirClicked = event.keyCode;
  //depending on which key is clicked, it will move 10 positions within the canvas of the specific axis
  const goUp = dy === -10;
  const goDown = dy === 10;
  const goRight = dx === 10;
  const goLeft = dx === -10;
  // left arrow clicked and not going right, it will move along the x axis negatively(meaning left), same goes for all other inputs
  if (dirClicked === leftIn && !goRight){
    dx = -10
    dy = 0
  }
  if (dirClicked === rightIn && !goLeft){
    dx = 10
    dy = 0
  }
  if (dirClicked === upIn && !goDown){
    dx = 0
    dy = -10
  }
  if (dirClicked === downIn && !goUp){
    dx = 0
    dy = 10
  }


}
//game over function will run in the dtart game function
function gameOver() {
//index of the snake if equal to its x and y axis ends the game, as the snake will have intercepted itself
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) 
    //gameFin is false in the global scope, if the for loop is met it will return true and end the game
    return gameFin = true
  }
  //if snake head position touches the edge of the canvas will also return gameFin as true, ending the game
  const collideLeft = snake[0].x < 0;
  const collideRight = snake[0].x > snakeboard.width - 10;
  const collideTop = snake[0].y < 0;
  const collideBottom = snake[0].y > snakeboard.height -10;
  // if any of these collisions is true, willreturn true
  if (collideLeft || collideRight || collideTop || collideBottom) {
  return gameFin = true
  }
}




