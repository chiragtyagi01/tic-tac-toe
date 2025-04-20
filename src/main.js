const boxes=document.querySelectorAll(".grid-item");
const newGameBtn=document.querySelector(".btn");
const restartBtn=document.querySelector(".restart-btn");
const winningBtn=document.querySelector(".winning-btn");
const oScore=document.querySelector(".o-score");
const drawScore=document.querySelector(".draw-score");
const xScore=document.querySelector(".x-score");

const playerX=document.querySelector(".player-x");
const sound1 = new Audio(playerX.getAttribute("data-sound"));

const playerDraw=document.querySelector(".draw");
const sound2 = new Audio(playerDraw.getAttribute("data-sound"));

const playerO=document.querySelector(".player-O");
const sound3 = new Audio(playerO.getAttribute("data-sound"));


const clickSound = new Audio('./assets/sounds/pop.mp3');
const winSound1 = new Audio('./assets/sounds/win1.wav');
const winSound2 = new Audio('./assets/sounds/win2.wav');
const drawSound = new Audio('./assets/sounds/draw2.wav');


let currentPlayer;
let gameGrid;
let xBox=0;
let drawBox=0;
let oBox=0;


const winningPosition=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function initGame(){
  currentPlayer="X";
  gameGrid=["","","","","","","","",""];
  //UI empty
  boxes.forEach((box, index) => {
    box.innerText = ""; // clear the box content
    box.style.pointerEvents = "all"; // re-enable clicking
  });
  

  winningBtn.classList.add("opacity-0");
  newGameBtn.innerText=`Player - ${currentPlayer} turn`;
  newGameBtn.classList.remove("bg-btn");
  newGameBtn.classList.remove("hover:bg-btn-hover");
  newGameBtn.classList.add(`bg-${currentPlayer}-box`);
  

}


function swapTurn(){
  if(currentPlayer==="X"){
    newGameBtn.classList.remove(`bg-X-box`);

    currentPlayer="O";

    newGameBtn.classList.remove("bg-btn");
    newGameBtn.classList.remove("hover:bg-btn-hover");
    newGameBtn.classList.add(`bg-${currentPlayer}-box`);

  }else{
    newGameBtn.classList.remove(`bg-O-box`);
    currentPlayer="X";
    newGameBtn.classList.remove("bg-btn");
    newGameBtn.classList.remove("hover:bg-btn-hover");
    newGameBtn.classList.add(`bg-${currentPlayer}-box`);
  }
  //UI update
  newGameBtn.innerText=`Player - ${currentPlayer} turn`;

}

function checkGameOver(){
  let winner="";
  // all three boxes should be non empty and must be equal in value
  winningPosition.forEach((position)=>{
    if( (gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="" ) && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]] )  ){
      // check if winner is x or o
      if(gameGrid[position[0]]==="X"){
        winner="X";
      }
      else{
        winner="O";
      }

      // disable pointer events
      boxes.forEach((box)=>{
        box.style.pointerEvents="none";
      })

        // boxes[position[0]].classList.add("bg-green-700");
        // boxes[position[0]].classList.remove("bg-grid-box");
        // boxes[position[1]].classList.add("bg-green-700");
        // boxes[position[1]].classList.remove("bg-grid-box");
        // boxes[position[2]].classList.add("bg-green-700");
        // boxes[position[2]].classList.remove("bg-grid-box");
    }
  });

  if(winner !== ""){
    
    winningBtn.classList.remove("opacity-0");
    winningBtn.innerText=`Player-${winner} wins!!`;
    if(winner =="X"){
      winSound1.play();
      xBox++;
      xScore.innerText=`${xBox}`;
    }
    if(winner == "O"){
      winSound2.play();
      oBox++;
      oScore.innerText=`${oBox}`;
    }
    winningBtn.classList.add("bg-green-600");
    winningBtn.classList.remove("bg-draw-box");

    newGameBtn.classList.add("bg-btn");
    newGameBtn.classList.add("hover:bg-btn-hover");
    newGameBtn.innerText="New Game";

    return;
  }

  // check for draw
  let fillCount=0;
  gameGrid.forEach((box)=>{
    if(box !==""){
      fillCount++;
    }
  });

  // board is filled game is a draw
  if(fillCount==9){
    drawSound.play();
    winningBtn.classList.remove("opacity-0");
    winningBtn.classList.remove("bg-green-600");
    winningBtn.classList.add("bg-draw-box");
    winningBtn.innerText="Its a Draw";
    newGameBtn.classList.add("bg-btn");
    newGameBtn.classList.add("hover:bg-btn-hover");
    newGameBtn.innerText="New Game";
    drawBox++;
    drawScore.innerText=`${drawBox}`;
  }

}



function handleClick(index){
  if(gameGrid[index]===""){
    clickSound.play();
    boxes[index].innerHTML=currentPlayer;

    gameGrid[index]=currentPlayer;
    boxes[index].style.pointerEvents="none";

    // boxes[index].classList.add(`text-${currentPlayer}-box`);
    if (currentPlayer === "X") {
      boxes[index].classList.remove("text-O-box");
      boxes[index].classList.add("text-X-box");
    } else {
      boxes[index].classList.remove("text-X-box");
      boxes[index].classList.add("text-O-box");
    }
    
    

    // swapturn
    swapTurn();

    // checkWinning status

    checkGameOver();
  }
}

boxes.forEach((boxes,index)=>{
  boxes.addEventListener("click",()=>{
    handleClick(index);
  })
});

newGameBtn.addEventListener("click",initGame);


restartBtn.addEventListener("click",()=>{
  // initGame();
  boxes.forEach((box, index) => {
    box.innerText = ""; // clear the box content
    box.style.pointerEvents = "all"; // re-enable clicking
  });
  winningBtn.classList.add("opacity-0");
  newGameBtn.classList.add("bg-btn");
  newGameBtn.classList.add("hover:bg-btn-hover");
  newGameBtn.innerText="New Game";
  xBox=0;
  drawBox=0;
  oBox=0;
  xScore.innerText="";
  drawScore.innerText="";
  oScore.innerText="";

});

// adding sounds effect

playerX.addEventListener("mouseenter", () => {
  sound1.currentTime = 0; // restart if it's already playing
  sound1.play();
});

playerDraw.addEventListener("mouseenter", () => {
  sound2.currentTime = 0; // restart if it's already playing
  sound2.play();
});

playerO.addEventListener("mouseenter", () => {
  sound3.currentTime = 0; // restart if it's already playing
  sound3.play();
});