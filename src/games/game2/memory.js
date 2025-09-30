import './memory.css'
import { getMemory, incrementMemory } from '../../lib/scoreboard.js'

let contenedor = null
let cardsContainer = null
let onClick = null

let deck = [],
  firstCard = null,
  lockBoard = false,
  matches = 0,
  currentPlayer = 1,
  score = { p1: 1, p2: 2 }

function suffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function createDeck(pairs = 6) {}

export default {
  mount(container) {
    container.innerHTML = `<section class="game"><h2>Juego 2</h2><p>Juego 2 en construcción...</p></section>`
  },
  unmount() {
    console.log('desmontando el juego 2')
  },
  reset() {}
}
