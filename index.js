                // Parameter

const cells = [...document.querySelectorAll(".case")];
console.log(cells);
const restartBtn=document.querySelectorAll(".restartButton")
console.log(restartBtn);


let game = true;
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

function ShowGame() {
    cells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
          if (game===true) {
            if (Players === "X") {
                let fillCell = e.target.id;
                if (copyCells[fillCell] != 1 && copyCells[fillCell] != 2) {
                  cells[fillCell].textContent = Players;
                  copyCells[fillCell] = "1";
                  console.log(copyCells);
                  Players = "O";
                  ToWin()
                  ChangePlayer();
                } else {
                  PlayerShow.textContent = "vous ne pouvez pas jouer la";
                  setTimeout(() => {
                    ChangePlayer();
                  }, 2000);
                  return;
                }
              } else {
                let fillCell = e.target.id;
                if (copyCells[fillCell] != 1 && copyCells[fillCell] != 2) {
                  cells[fillCell].textContent = Players;
                  copyCells[fillCell] = "2";
                  console.log(copyCells);
                  Players = "X";
                  ToWin()
                  ChangePlayer();
                } else {
                  PlayerShow.textContent = "vous ne pouvez pas jouer la";
                  setTimeout(() => {
                    ChangePlayer();
                  }, 2000);
                  return;
                }
              }
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
    game=true
}
function GameEnd() {
    ShowGameEnd.style.visibility="visible"
}
restartBtn.forEach((btn)=>{
    btn.addEventListener("click",btnRestart)
})

window.addEventListener("load", ChangePlayer);
ShowGame();
