                // Parameter

const cells = [...document.querySelectorAll(".case")];
console.log(cells);
const restartBtn=document.querySelectorAll(".restartButton")
console.log(restartBtn);
const Morpion=document.querySelector(".Show_game")
const ScorePlayer1=document.querySelectorAll(".ScoreJoueur1")
const ScorePlayer2=document.querySelectorAll(".ScoreJoueur2")
const ScoreMatchNull=document.querySelectorAll(".ScoreMatchNull")


let game = true;
let fillCell;
let scoreP1=0
let scoreP2=0
let scoreMN=0
let Players = "X";
let copyCells = [null, null, null, null, null, null, null, null, null];

//anim fonction


// début function
function ChangePlayer() {
  if (Players === "X") {
    PlayerShow.textContent = "c'est au tour du joueur 1";
  } else if(Players==="O"){
    PlayerShow.textContent = "c'est au tour du joueur 2";
  }
}
function IsLetter(){
  PlayerShow.textContent = "vous ne pouvez pas jouer la";
  PlayerShow.style.scale="1.2"
  setTimeout(() => {
    PlayerShow.style.scale="1"
    ChangePlayer();
  }, 1000);
}
function ShowGame() {
    cells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
          if (game===true) {
            if (Players === "X") {
                fillCell = e.target.id;
                if (copyCells[fillCell] != 1 && copyCells[fillCell] != 2) {
                  cells[fillCell].textContent = Players;
                  cells[fillCell].classList.remove("letter-O")
                  cells[fillCell].classList.add("letter-X")
                  copyCells[fillCell] = "1";
                  ToWin()
                  ChangePlayer();
                } else {
                  IsLetter()
                  return;
                }
              } else {
                let fillCell = e.target.id;
                if (copyCells[fillCell] != 1 && copyCells[fillCell] != 2) {
                  cells[fillCell].textContent = Players;
                  cells[fillCell].classList.remove("letter-X")
                  cells[fillCell].classList.add("letter-O")
                  copyCells[fillCell] = "2";
                  ToWin()
                  ChangePlayer();
                } else {
                  IsLetter()
                  return;
                }
              }
              Players==="X" ? Players="O" : Players="X"
              ChangePlayer()
            };
          })
    });        
}
function ToWin() {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
      [2, 4, 6], [0, 4, 8] // diagonales
    ];
    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (copyCells[a] !== null && copyCells[a] === copyCells[b] && copyCells[b] === copyCells[c]) {
        EndWinPlayerP.textContent = `Le joueur ${copyCells[a]} a gagné`;
        if (copyCells[a]==1) {
          scoreP1++
          ScorePlayer1.forEach((P1)=>{
            P1.textContent=scoreP1<10 ? "0"+scoreP1 : scoreP1
          })
        } else if(copyCells[a]==2) {
          scoreP2++
          ScorePlayer2.forEach((P2)=>{
            P2.textContent=scoreP1<10 ? "0"+scoreP1 : scoreP1
          })
        }
        game=false
        GameEnd()
        return;
      }
    }
    // math nul
    let MatchNul=copyCells.every(index=>index !==null)
    if (MatchNul) {
        EndWinPlayerP.textContent = "Personne à gagner!";
        SpanMessage.innerHTML="Match Nul"
        scoreMN++;
        ScoreMatchNull.forEach((MN)=>{
          MN.textContent=scoreMN<10 ? "0"+scoreMN : scoreMN
        })
        game=false
        GameEnd()
        return;
    }
}
function btnRestart(){
    ShowGameEnd.style.visibility="hidden"
    ShowGameEnd.style.transform="translate(-50%,50%)"

    cells.forEach((cell)=>{
        cell.textContent="";
    })
    copyCells = [null,null,null,null,null,null,null,null,null]
    Players="X"
    ChangePlayer()
    game=true
}
function GameEnd() {
    ShowGameEnd.style.visibility="visible"
    ShowGameEnd.style.transform="translate(-50%,-50%)"
    Morpion.style.filter="blur(2px)"
    Morpion.style.opcity="0.7"
    interval=setInterval(generatorBubbles,200)
}
restartBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
      btnRestart()
      Morpion.style.filter="blur(0px)"
    })
})
btnInitScore.addEventListener("click",()=>{
  scoreP1=0
  scoreP2=0
  scoreMN=0
  ScorePlayer1.forEach((P1)=>{
    P1.textContent=""
  })
  ScorePlayer2.forEach((P2)=>{
    P2.textContent=""
  })
  ScoreMatchNull.forEach((MN)=>{
    MN.textContent=""
  })
})






// Full Screen BTN

const CaseMorpion=document.querySelector(".morpion")
const DivParametre=document.querySelector(".parameter")
const titre=document.querySelector("h1")
let FullScreen=true

function IconeFullScreen(){
  if(FullScreen){
    BtnFullScreen.classList.add("fa-compress")
    BtnFullScreen.classList.remove("fa-expand")
    FullScreen=false
  }else{
    BtnFullScreen.classList.remove("fa-compress")
    BtnFullScreen.classList.add("fa-expand")
    FullScreen=true
  }
}

BtnFullScreen.addEventListener("click",()=>{
    IconeFullScreen()
    CaseMorpion.classList.toggle("fullScreen")
    DivParametre.classList.toggle("Hidden")
    PlayerShow.classList.toggle("Hidden")
    titre.classList.toggle("Hidden")
})

window.addEventListener("load", ChangePlayer);
ShowGame();
