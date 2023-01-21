import { WINNER_combos } from "../components/constants";

export const checkWinnerFrom = (boardToCheck) =>{

    //revisamos todas las combinaciones ganadoras
    //para ver si x u o gano
    for (const combo of WINNER_combos) {
      const [a, b, c] = combo

      if (
        boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
      // si no hay ganador regresamos un null
      
    }
    return null;
}