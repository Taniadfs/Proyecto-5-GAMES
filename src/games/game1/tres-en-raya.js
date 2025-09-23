import './tres-en-raya.css'
import { scoreboard, saveScoreboard } from '../../lib/scoreboard.js'

let board, currentPlayer, isFinished, winner

let contenedor = null
let estadoElJuego = null
let tableroEl = null
let onClick = null

function initState() {
  board = Array(9).fill(null)
  currentPlayer = 'X'
  isFinished = false
  winner = null
}

function render() {
  if (!contenedor) return

  if (isFinished) {
    estadoElJuego.textContent =
      winner === 'draw' ? `Empate!` : `Ha ganado ${winner}!`
  } else {
    estadoElJuego.textContent = `Turno de ${currentPlayer}`
  }

  tableroEl.querySelectorAll('.cell').forEach((btn, i) => {
    btn.textContent = board[i] ?? ''
  })
}

function reset() {
  initState()
  render()
}

function checkWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

function isDraw(board) {
  return board.every((valor) => valor !== null)
}

function ensureTTT() {
  return (scoreboard.tictactoe ??= { X: 0, O: 0, draw: 0 })
}

export default {
  mount(container) {
    contenedor = container

    const cells = Array.from(
      { length: 9 },
      (_, i) =>
        `<button class="cell" data-i="${i}" type="button" aria-label="Celda ${
          i + 1
        }"></button>`
    ).join('')
    container.innerHTML = `
      <section class="game tictactoe">
      <h2>Tres en raya</h2>
      <p class="status" aria-live="polite"></p>
      <div class="board">${cells}</div>
      <button class="reset" type="button">Reiniciar</button>
      </section>
      `

    estadoElJuego = contenedor.querySelector('.status')
    tableroEl = contenedor.querySelector('.board')
    initState()
    render()
    onClick = (e) => {
      const resetBtn = e.target.closest('.reset')
      if (resetBtn) {
        reset()
        return
      }

      const cell = e.target.closest('.cell')
      if (!cell) return

      if (isFinished) return
      const i = Number(cell.dataset.i)
      if (board[i]) return

      board[i] = currentPlayer

      const w = checkWinner(board)
      if (w) {
        winner = w
        isFinished = true
      } else if (isDraw(board)) {
        winner = 'draw'
        isFinished = true
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
      }

      render()
    }

    contenedor.addEventListener('click', onClick)
  },

  unmount() {
    console.log('desmontando el juego del tres en raya')
    if (contenedor && onClick) {
      contenedor.removeEventListener('click', onClick)
    }
    onClick = null

    contenedor = null
    estadoElJuego = null
    tableroEl = null
  },
  reset() {
    initState()
    render()
  }
}
