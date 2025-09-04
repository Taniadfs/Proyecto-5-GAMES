import './tres-en-raya.css'
export default {
  mount(container) {
    container.innerHTML = `
      <section class="game"><h2>Tres en raya</h2><p>Juego en construcción Tres en raya...</p></section>`
  },
  unmount() {
    console.log('desmontando el juego del tres en raya')
  },
  reset() {}
}
