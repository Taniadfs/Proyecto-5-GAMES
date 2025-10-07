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

    const recordGuardado = localStorage.getItem('simonSaysRecord')
    if (recordGuardado) {
      record = parseInt(recordGuardado)
      document.getElementById('record').textContent = record
    }

    const btnEmpezar = container.querySelector('.empezar')
    btnEmpezar.addEventListener('click', () => {
      if (!juegoActivo) {
        juegoActivo = true
        btnEmpezar.disabled = true
        agregarColorAleatorio()
        mostrarSecuencia()
      }
    })

    const botones = container.querySelectorAll('.boton')
    botones.forEach((boton) => {
      boton.addEventListener('click', (e) => {
        const colorClickeado = e.target.dataset.color
        clickJugador.push(colorClickeado)
        if (clickJugador.length === secuenciaSimon.length) {
          verificarRespuesta()
        }
      })
    })
  },
  unmount() {
    console.log('desmontando el juego 3')
  },
  reset() {}
}

const COLORES = ['rojo', 'verde', 'azul', 'amarillo']

function agregarColorAleatorio() {
  const colorAleatorio = COLORES[Math.floor(Math.random() * COLORES.length)]
  secuenciaSimon.push(colorAleatorio)
  ronda++
  document.getElementById('ronda').textContent = ronda
}
function iluminarBoton(color) {
  const button = document.querySelector(`[data-color="${color}"]`)
  button.classList.add('activo')
  setTimeout(() => {
    button.classList.remove('activo')
  }, 400)
}

function mostrarSecuencia() {
  clickJugador = []
  secuenciaSimon.forEach((color, index) => {
    setTimeout(() => {
      iluminarBoton(color)
    }, index * 600)
  })
}

function verificarRespuesta() {
  if (JSON.stringify(clickJugador) === JSON.stringify(secuenciaSimon)) {
    console.log('¡Correcto! Siguiente ronda')
    setTimeout(() => {
      agregarColorAleatorio()
      mostrarSecuencia()
    }, 1000)
  } else {
    gameOver()
  }
}
function gameOver() {
  alert(`¡Fin del juego! Llegaste al nivel ${ronda}`)

  if (ronda > record) {
    record = ronda
    localStorage.setItem('simonSaysRecord', record)
    document.getElementById('record').textContent = record
  }

  secuenciaSimon = []
  clickJugador = []
  ronda = 0
  juegoActivo = false
  document.getElementById('ronda').textContent = 0

  const btnEmpezar = document.querySelector('.empezar')
  btnEmpezar.disabled = false
}
