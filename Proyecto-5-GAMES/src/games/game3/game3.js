import './game3.css'

export default {
  mount(container) {
    container.innerHTML = `<section class="game"><h2>Juego 3</h2><p>Juego 3 en construcción...</p></section>`
  },
  unmount() {
    console.log('desmontando el juego 3')
  },
  reset() {}
}
