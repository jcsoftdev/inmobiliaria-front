type EventCallback = <T = unknown>(...args: T[]) => void

type EventType = string | symbol

class EventBus {
  private events: Record<EventType, EventCallback[]> = {}

  on(event: EventType, callback: EventCallback) {
    if (!this.events[event]) this.events[event] = []
    this.events[event].push(callback)
  }

  off(event: EventType, callback: EventCallback) {
    if (!this.events[event]) return
    this.events[event] = this.events[event].filter((cb) => cb !== callback)
  }

  emit<T = unknown>(event: EventType, ...args: T[]) {
    if (!this.events[event]) return
    this.events[event].forEach((callback) => callback(...args))
  }
}

export const eventBus = new EventBus()
