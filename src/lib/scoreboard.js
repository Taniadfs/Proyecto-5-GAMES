const KEY = 'games.scoreboard.v1'

const DEFAULT = {
  tictactoe: { wins: 0, losses: 0, draws: 0 }
}

function safeParse(raw) {
  try {
    const value = JSON.parse(raw)
    return value && typeof v === 'object' ? value : null
  } catch {
    return null
  }
}

function normalize(data) {
  const normalized = data && typeof data === 'object' ? data : {}
  if (!normalized.tictactoe || typeof normalized.tictactoe !== 'object') {
    normalized.tictactoe = {}
  }
}
