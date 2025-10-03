import './simonSays.css'

let secuenciaSimon = []
let clickJugador = []
let ronda = 0
let contenedor = null
let juegoActivo = false
let record = 0

export default {
  mount(container) {
    container.innerHTML = `<section class="simonSays">
    <h2>Simon Says</h2>
    <p>Ronda: <span id="ronda">0</span></p>
    <p>Récord: <span id="record">0</span></p>

    <div class="board">
    <button class="boton boton-rojo" data-color="rojo"></button>
    <button class="boton boton-verde" data-color="verde"></button>
    <button class="boton boton-azul" data-color="azul"></button>
    <button class="boton boton-amarillo" data-color="amarillo"></button>

    </div>
    <button class="empezar">Empezar</button>
  
    </section>`
  },
  unmount() {
    console.log('desmontando el juego 3')
  },
  reset() {}
}
