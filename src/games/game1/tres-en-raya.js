import './tres-en-raya.css'

let board, currentPlayer, isFinished, winner

let contenedor = null
let estadoElJuego = null
let tableroEl = null

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
    render(contenedor)
  },
  unmount() {
    console.log('desmontando el juego del tres en raya')
  },
  reset() {
    initState()
    render()
  }
}
