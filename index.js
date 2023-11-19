const cells = [...document.querySelectorAll(".case")];
console.log(cells);
const restartBtn=document.querySelector(".restartButton")

let game=true
let PLayers = "X";
let copyCells = [null,null,null,null,null,null,null,null,null];

function ChangePlayer() {
  if (PLayers === "X") {
    PlayerShow.textContent = "c'est au tour du joueur 1";
  } else {
    PlayerShow.textContent = "c'est au tour du joueur 2";
  }
}
function ShowGame() {
    cells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
          if (game===true) {
            if (PLayers === "X") {
                let fillCell = e.target.id;
                if (copyCells[fillCell] != 1 && copyCells[fillCell] != 2) {
                  cells[fillCell].textContent = PLayers;
                  copyCells[fillCell] = "1";
                  console.log(copyCells);
                  PLayers = "O";
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
                  cells[fillCell].textContent = PLayers;
                  copyCells[fillCell] = "2";
                  console.log(copyCells);
                  PLayers = "X";
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
        EndWinPlayer.textContent = `Le joueur ${copyCells[a]} a gagné`;
        game=false
        GameEnd()
        return;
      }
    }
}
  
function GameEnd() {
    ShowGameEnd.style.visibility="visible"
    restartBtn.addEventListener("click",()=>{
        ShowGameEnd.style.visibility="hidden"
        cells.forEach((cell)=>{
            cell.textContent="";
        })
        copyCells = [null,null,null,null,null,null,null,null,null]
        game=true
    })
}
window.addEventListener("load", ChangePlayer());
ShowGame();
