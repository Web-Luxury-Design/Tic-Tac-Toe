                // Parameter

const cells = [...document.querySelectorAll(".case")];
console.log(cells);
const restartBtn=document.querySelectorAll(".restartButton")
console.log(restartBtn);
const Morpion=document.querySelector(".Show_game")
const ScorePlayer1=document.querySelector(".ScoreJoueur1")
const ScorePlayer2=document.querySelector(".ScoreJoueur2")
const ScoreMatchNull=document.querySelector(".ScoreMatchNull")


let game = true;
let fillCell;
let scoreP1=0
let scoreP2=0
let scoreMN=0
let Players = "X";
let copyCells = [null, null, null, null, null, null, null, null, null];

// début function
function ChangePlayer() {
  if (Players === "X") {
    PlayerShow.textContent = "c'est au tour du joueur 1";
  } else{
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
              Players=="X" ? Players="O" : Players="X"
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
          ScorePlayer1.textContent= scoreP1<10 ? "0" +scoreP1 :scoreP1
        } else if(copyCells[a]==2) {
          scoreP2++
          ScorePlayer2.textContent= scoreP2<10 ? "0" +scoreP2 :scoreP2
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
        ScoreMatchNull.textContent= scoreMN<10 ? "0" +scoreMN :scoreMN
        game=false
        GameEnd()
        return;
    }
}
function btnRestart(){
    ShowGameEnd.style.visibility="hidden"
    cells.forEach((cell)=>{
        cell.textContent="";
    })
    copyCells = [null,null,null,null,null,null,null,null,null]
    Players="X"
    game=true
}
function GameEnd() {
    ShowGameEnd.style.visibility="visible"
    Morpion.style.filter="blur(2px)"
    Morpion.style.opcity="0.7"
}
restartBtn.forEach((btn)=>{
    btn.addEventListener("click",btnRestart)
})

window.addEventListener("load", ChangePlayer);
ShowGame();
