type TripleClickResult = {
  recentClicks: number[]
  triggered: boolean
}

export function registerTripleClick(recentClicks: number[], clickAt: number, windowMs = 420): TripleClickResult {
  const nextClicks = [...recentClicks, clickAt].filter((timestamp) => clickAt - timestamp <= windowMs)

  if (nextClicks.length >= 3) {
    return {
      recentClicks: [],
      triggered: true,
    }
  }

  return {
    recentClicks: nextClicks,
    triggered: false,
  }
}
