import './memory.css'
import { incrementMemory } from '../../lib/scoreboard.js'

let deck = []
let firstCard = null
let lockBoard = false
let matches = 0
let currentPlayer = 1
let score = { p1: 0, p2: 0 }
let onCardClick = null
let contenedor = null
let gameReset = null

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

export default {
  mount(container) {
    contenedor = container
    gameReset = this

    deck = createDeck()
    const cardsHTML = deck
      .map(
        (emoji, index) =>
          `<button class="card" data-index="${index}" aria-label="Card ${
            index + 1
          }">?</button>`
      )
      .join('')
    container.innerHTML = `<section class="memory">
    <h2>Memory</h2>
    <div class="scoreboard">
    <p>Jugador 1: <span id="score-p1">${score.p1}</span> | Jugador 2: <span id="score-p2">${score.p2}</span></p>
    <p class="turn">Turno : Jugador <span id="current-player">${currentPlayer}</span></p>
    </div>
   <div class="board">${cardsHTML}</div>
    </section>`

    onCardClick = (e) => {
      const card = e.target
      if (lockBoard || card === firstCard || !card.classList.contains('card'))
        return

      card.textContent = deck[card.dataset.index]
      card.classList.add('flipped')

      if (!firstCard) {
        firstCard = card
      } else {
        lockBoard = true
        const firstEmoji = deck[firstCard.dataset.index]
        const secondEmoji = deck[card.dataset.index]

        if (firstEmoji === secondEmoji) {
          matches++
          score[`p${currentPlayer}`]++
          document.getElementById(`score-p${currentPlayer}`).textContent =
            score[`p${currentPlayer}`]

          firstCard = null
          lockBoard = false

          if (matches === 6) {
            if (score.p1 > score.p2) {
              alert('Ha ganado el jugador 1')
              incrementMemory('wins')
            } else if (score.p2 > score.p1) {
              alert('Ha ganado el jugador 2')
              incrementMemory('losses')
            } else {
              alert('Empate!')
              incrementMemory('draws')
            }

            setTimeout(() => {
              this.reset()
            }, 500)
          }
        } else {
          setTimeout(() => {
            firstCard.textContent = '?'
            card.textContent = '?'
            firstCard.classList.remove('flipped')
            card.classList.remove('flipped')
            firstCard = null
            lockBoard = false
            currentPlayer = currentPlayer === 1 ? 2 : 1
            document.getElementById('current-player').textContent =
              currentPlayer
          }, 1000)
        }
      }
    }

    const cards = document.querySelectorAll('.card')
    cards.forEach((card) => {
      card.addEventListener('click', onCardClick)
    })
  },

  unmount() {
    const cards = document.querySelectorAll('.card')
    if (cards && onCardClick) {
      cards.forEach((card) => {
        card.removeEventListener('click', onCardClick)
      })
    }
    onCardClick = null
  },

  reset() {
    this.unmount()
    matches = 0
    firstCard = null
    lockBoard = false
    currentPlayer = 1
    score = { p1: 0, p2: 0 }
    this.mount(contenedor)
  }
}
