import './simonSays.css'

let secuenciaSimon = []
let clickJugador = []
let ronda = 0
let contenedor = null
let juegoActivo = false
let record = 0
let btnEmpezarListener = null
let botonesListeners = []

export default {
  mount(container) {
    contenedor = container
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
    btnEmpezarListener = () => {
      if (!juegoActivo) {
        juegoActivo = true
        btnEmpezar.disabled = true
        agregarColorAleatorio()
        mostrarSecuencia()
      }
    }
    btnEmpezar.addEventListener('click', btnEmpezarListener)

    const botones = container.querySelectorAll('.boton')
    botones.forEach((boton, index) => {
      const listener = (e) => {
        const colorClickeado = e.target.dataset.color
        clickJugador.push(colorClickeado)
        if (clickJugador.length === secuenciaSimon.length) {
          verificarRespuesta()
        }
      }
      botonesListeners[index] = listener
      boton.addEventListener('click', listener)
    })
  },

  unmount() {
    console.log(
      '🔴 UNMOUNT LLAMADO - botonesListeners antes:',
      botonesListeners.length
    )

    if (contenedor && btnEmpezarListener) {
      const btnEmpezar = contenedor.querySelector('.empezar')
      if (btnEmpezar) {
        btnEmpezar.removeEventListener('click', btnEmpezarListener)
        console.log('✅ Listener de btnEmpezar eliminado')
      }
    }

    if (contenedor && botonesListeners.length > 0) {
      const botones = contenedor.querySelectorAll('.boton')
      console.log(
        '🔴 Intentando eliminar',
        botonesListeners.length,
        'listeners de botones'
      )

      botones.forEach((boton, index) => {
        if (botonesListeners[index]) {
          boton.removeEventListener('click', botonesListeners[index])
          console.log('✅ Listener', index, 'eliminado')
        }
      })
    }

    secuenciaSimon = []
    clickJugador = []
    ronda = 0
    juegoActivo = false

    btnEmpezarListener = null
    botonesListeners = []
    console.log(
      '🔴 UNMOUNT COMPLETADO - botonesListeners después:',
      botonesListeners.length
    )
  },
  reset() {
    this.unmount()
    this.mount(contenedor)
  }
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
  if (button) {
    button.classList.add('activo')
    setTimeout(() => {
      button.classList.remove('activo')
    }, 400)
  }
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

  if (contenedor) {
    const btnEmpezar = contenedor.querySelector('.empezar')
    if (btnEmpezar) {
      btnEmpezar.disabled = false
    }
  }
}
