const KEY = 'games.scoreboard.v1'

function safeParse(raw) {
  try {
    const v = JSON.parse(raw)
    return v && typeof v === 'object' ? v : null
  } catch {
    return null
  }
}

function normalize(data) {
  const normalized = data && typeof data === 'object' ? data : {}

  // Tres en Raya
  if (!normalized.tictactoe || typeof normalized.tictactoe !== 'object') {
    normalized.tictactoe = {}
  }
  const ttt = normalized.tictactoe
  ttt.wins = Number.isFinite(ttt.wins) ? ttt.wins : 0
  ttt.losses = Number.isFinite(ttt.losses) ? ttt.losses : 0
  ttt.draws = Number.isFinite(ttt.draws) ? ttt.draws : 0

  // Memory
  if (!normalized.memory || typeof normalized.memory !== 'object') {
    normalized.memory = {}
  }
  const mem = normalized.memory
  mem.wins = Number.isFinite(mem.wins) ? mem.wins : 0
  mem.losses = Number.isFinite(mem.losses) ? mem.losses : 0
  mem.draws = Number.isFinite(mem.draws) ? mem.draws : 0

  // Simon Says
  if (!normalized.simonSays || typeof normalized.simonSays !== 'object') {
    normalized.simonSays = {}
  }
  const simon = normalized.simonSays
  simon.record = Number.isFinite(simon.record) ? simon.record : 0

  return normalized
}

function loadScoreboard() {
  const data = safeParse(localStorage.getItem(KEY)) ?? {}
  return normalize(data)
}

function saveScoreboard(data) {
  localStorage.setItem(KEY, JSON.stringify(normalize(data)))
}

// TRES EN RAYA
export function getTTT() {
  return loadScoreboard().tictactoe
}

export function incrementTTT(field) {
  if (!['wins', 'losses', 'draws'].includes(field)) {
    throw new Error('USA: wins | losses | draws')
  }

  const data = loadScoreboard()
  data.tictactoe[field]++
  saveScoreboard(data)
  return data.tictactoe
}

// MEMORY
export function getMemory() {
  return loadScoreboard().memory
}

export function incrementMemory(field) {
  if (!['wins', 'losses', 'draws'].includes(field)) {
    throw new Error('USA: wins | losses | draws')
  }

  const data = loadScoreboard()
  data.memory[field]++
  saveScoreboard(data)
  return data.memory
}

// SIMON SAYS
export function getSimonSays() {
  return loadScoreboard().simonSays
}

export function setSimonRecord(newRecord) {
  const data = loadScoreboard()
  if (Number.isFinite(newRecord) && newRecord > data.simonSays.record) {
    data.simonSays.record = newRecord
    saveScoreboard(data)
  }
  return data.simonSays
}
