import './memory.css'
import { getMemory, incrementMemory } from '../../lib/scoreboard.js'



let deck = []
let firstCard = null
let lockBoard = false
let matches = 0
let currentPlayer = 1
let score = { p1: 0, p2: 0 }

function suffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function createDeck(pairs = 6) {
  const emojis = ['🍎', '🍋', '🍉', '🍇', '🥭', '🍑']
  return suffle([...emojis, ...emojis])
}

function handleCardClick(e) {
  const card = e.target
  if (lockBoard || card === firstCard || !card.classList.contains('card')) return

  card.textContent = deck[card.dataset.index]
  card.classList.add('flipped')

  if (!firstCard) {
    firstCard = card
  } else {
    lockBoard = true
  const firstEmoji = deck[firstCard.dataset.index]
  const secondEmoji = deck[card.dataset.index]

  } if (firstEmoji === secondEmoji)  return{
    matches
  } else {

}
export default {
  mount(container) {
    deck = createDeck()
    const cardsHTML = deck
      .map(
        (emoji, index) =>
          `<button class="card" data-index="${index}" aria-label="Card ${
            index + 1
          }">?</button>`
      )
      .join('')
    container.innerHTML = `<section class="game">
    <h2>Memory</h2>
    <div class="scoreboard">
    <p>Jugador 1: <span id="score-p1">${score.p1}</span> | Jugador 2: <span id="score-p2">${score.p2}</span></p>
    <p class="turn">Turno : Jugador <span id="current-player">${currentPlayer}</span></p>
    </div>
   <div class="board">${cardsHTML}</div>
    </section>`

   

    const cards = document.querySelectorAll('.card')
    cards.forEach(card => {
      card.addEventListener('click', handleCardClick);
    },

  
  unmount() {
    console.log('desmontando el juego 2')
  },
  reset() {}
}
