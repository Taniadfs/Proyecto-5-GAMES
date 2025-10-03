import game1 from './games/game1/tres-en-raya.js'
import game2 from './games/game2/memory.js'
import game3 from './games/game3/simonSays.js'

const games = { game1, game2, game3 }
let currentGame = null
let view = null

function show(key) {
  console.log('[show]', { key, prev: currentGame, hasModule: !!games[key] })
  if (currentGame && games[currentGame]?.unmount) {
    games[currentGame].unmount()
  }

  currentGame = key
  console.log(
    '[mount]',
    currentGame,
    'mount exists?',
    !!games[currentGame]?.mount
  )
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
  console.log('[init] view ok?', !!view)

  document.querySelectorAll('[role="tab"][data-game]').forEach((btn) => {
    btn.addEventListener('click', () => {
      console.log('[click tab]', btn.dataset.game)
      show(btn.dataset.game)
    })
  })
  show('game1')
}
