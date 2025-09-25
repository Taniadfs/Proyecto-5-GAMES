const KEY = 'games.scoreboard.v1'

const DEFAULT = {
  tictactoe: { wins: 0, losses: 0, draws: 0 }
}

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
  if (!normalized.tictactoe || typeof normalized.tictactoe !== 'object') {
    normalized.tictactoe = {}
  }

  const ttt = normalized.tictactoe
  ttt.wins = Number.isFinite(ttt.wins) ? ttt.wins : 0
  ttt.losses = Number.isFinite(ttt.losses) ? ttt.losses : 0
  ttt.draws = Number.isFinite(ttt.draws) ? ttt.draws : 0
  return normalized
}

function loadScoreboard() {
  const data = safeParse(localStorage.getItem(KEY)) ?? {}
  return normalize(data)
}

function saveScoreboard(data) {
  localStorage.setItem(KEY, JSON.stringify(normalize(data)))
}

//API//

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
