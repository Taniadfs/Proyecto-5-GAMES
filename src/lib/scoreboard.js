const KEY = 'games.scoreboard.v1'

export function loadScoreboard() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveScoreboard(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}
