
const gameinfo=document.querySelector(".game-info");
const boxes=document.querySelectorAll(".box");
const newgamebtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;
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

function initgame(){
    currentPlayer ="X";
    gameGrid=["","","","","","","","",""];
    // ui per empty karna bhi padega sabhi box ko
    boxes.forEach((box ,index)=>{
        box.innerText="";
        boxes[index].classList.remove("win");
        
        boxes[index].classList.remove("Event");
    });
    newgamebtn.classList.remove("active");
    gameinfo.innerText =`Current Player-${currentPlayer}`;

}
initgame();


function swapturn(){
    if (currentPlayer=="X") { 
        currentPlayer="O";
        
    }
    else{
        currentPlayer="X";
    }
}

function Checkgameover(){
    let answer="";
    winningPosition.forEach((position)=>{
     if((gameGrid[position[0]]!==""||gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")
     &&(gameGrid[position[0]] === gameGrid[position[1]])&&(gameGrid[position[1]] === gameGrid[position[2]]))
    {
      //check if winner is x
     if (gameGrid[position[0]]==="X"){
        answer="X";
     }
     else
     {
        answer="O";
     }
                       
//disable pointer events
     
boxes.forEach((box)=>{
    box.classList.add("Event");
    });

     boxes[position[0]].classList.add("win");
     boxes[position[1]].classList.add("win");
     boxes[position[2]].classList.add("win");

     var audio=new Audio('success-fanfare-trumpets-6185.mp3');
        audio.play();
    
    }

    });

    //it means we have a winner 
    if (answer!=="") {
        gameinfo.innerText=`Winner Player-${answer}`;
        newgamebtn.classList.add("active");
        return;
    }
     //when there is no winner
     let fillcount=0;
     gameGrid.forEach((index)=>{
        if(index!=="")
        fillcount++;
     });
     if (fillcount===9) {
        gameinfo.innerText="Game Tied😡😡";
        newgamebtn.classList.add("active"); 
        var audio=new Audio('wrong-buzzer-6268.mp3');
        audio.play();
     }


}
function audioplay(){
    var audio=new Audio('shooting-sound-fx-159024.mp3');
        audio.play();
}

function handleclick(index){
    if (gameGrid[index] ==="") {
        boxes[index].innerText=currentPlayer; 
        gameinfo.innerText =`Current Player-${currentPlayer}`;
        gameGrid[index]=currentPlayer; 
        boxes[index].style.PointerEvents= "none";
        audioplay();
        swapturn();
        Checkgameover();
        
    }
   
}


boxes.forEach((box, index) => {
    box.addEventListener('click',()=>{ 
        
        handleclick(index);
    })
    
});

newgamebtn.addEventListener('click', initgame);
   