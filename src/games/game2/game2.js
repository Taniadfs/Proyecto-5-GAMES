import './game2.css'

export default {
  mount(container) {
    container.innerHTML = `<section class="game"><h2>Juego 2</h2><p>Juego 2 en construcción...</p></section>`
  },
  unmount() {
    console.log('desmontando el juego 2')
  },
  reset() {}
}
