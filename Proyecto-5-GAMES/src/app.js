import game1 from './games/game1/tres-en-raya.js'
import game2 from './games/game2/juego-2.js'
import game3 from './games/game3/juego-3.js'

const games = { game1, game2, game3 }
let currentGame = null
let view = null

function show(key) {
  if (currentGame && games[currentGame]?.unmount) {
    games[currentGame].unmount()
  }

  currentGame = key
  games[currentGame].mount(view)

  document.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.setAttribute(
      'aria-selected',
      tab.dataset.game === key ? 'true' : 'false'
    )
  })
}

export function initApp() {
  view = document.querySelector('#view')
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"] [data-game] ')
    if (!tab) return
    show(tab.dataset.game)
  })
  show('game1')
}
