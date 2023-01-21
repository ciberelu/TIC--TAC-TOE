import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"
import {Square }from "./components/Square"
import {TURNS, WINNER_combos} from "./components/constants"
import { checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'


function App() {

  //para recuperar los datos del localStorage e iniciar un estado con esos datos
  //se debe pasar un callback en el estado

  const [board, setBoard] = useState( () =>{

    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) {
      return JSON.parse(boardFromStorage)
    }
    
    return Array(9).fill(null)
    
    

  });

  
  const [turn, setTurn] = useState( ()=>{
    const turnFromStorage = window.localStorage.getItem("turn");
    if (turnFromStorage){
      if (turnFromStorage === TURNS.X){
        return TURNS.O
      }else if (turnFromStorage === TURNS.O){
        return TURNS.X
      }
      
    } 

    return TURNS.X


  });

  //estado para manejar al ganador, si es null no hay ganador, si es false es empate
  const [winner, setWinner] = useState(null);

  
  
  const checkEndGame = (boardToCheck) => {
    //revisamos si hay un empate
    //si no hay mas espacios vacios
    //en el tablero

    return boardToCheck.every((square) => square !== null)
  }
  const resetGame = ()=>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    //tambien se debe resetear el local Storage

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn")
  }
  const updateBoard = (index) => {
    //primero revisamos si el board en la posicion tiene algo
    //si es asi ya no actualizamos, tomar en cuenta que board empieza como nulo
    if (board[index] || winner ) return;
    //actualizar el tablero
    const newBoard = [...board];//spreed operator para no mutar el estado original
    newBoard[index] = turn;
    setBoard(newBoard);


    //intercambiar los turnos
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //guardar partida en localStorage
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", turn)

    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner){
      confetti()
      setWinner(newWinner);
    }else if (checkEndGame(newBoard)){
      setWinner(false) //para identificar el empate
    }






  }

  return (

    <main className='board'>

      <button  onClick={resetGame}>Reiniciar Juego</button>
      <h1>Tic Tac toe</h1>

      <section className='game'>
        {
          board.map((cuadrado, index) =>{
            return (
             <Square
              key={index}
              index = {index}
              updateBoard = {updateBoard}//aqui pasamos la funcion no la ejecucion
             >
              
              {cuadrado}
             </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>

      </section>

      <WinnerModal
        resetGame={resetGame} winner={winner} 
      />
    </main>
    
  )
}

export default App
