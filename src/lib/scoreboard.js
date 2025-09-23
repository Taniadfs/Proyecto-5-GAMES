const KEY = 'games.scoreboard.v1'

export const scoreboard = loadScoreboard()

function loadScoreboard() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveScoreboard() {
  localStorage.setItem(KEY, JSON.stringify(scoreboard))
}
