type EventCallback = <T = unknown>(...args: T[]) => void

type EventType = string | symbol

const createEventBus = () => {
  const events: Record<EventType, EventCallback[]> = {}

  const on = (event: EventType, callback: EventCallback) => {
    if (!events[event]) events[event] = []
    events[event].push(callback)
  }

  const off = (event: EventType, callback: EventCallback) => {
    if (!events[event]) return
    events[event] = events[event].filter((cb) => cb !== callback)
  }

  const emit = <T = unknown>(event: EventType, ...args: T[]) => {
    if (!events[event]) return
    events[event].forEach((callback) => callback(...args))
  }

  return {
    on,
    off,
    emit,
  }
}

export const eventBus = createEventBus()
