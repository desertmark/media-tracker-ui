export class EventEmitter {
  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
    return {
      unsubscribe: () => {
        this.subscribers = this.subscribers.filter(s => s !== subscriber)
      }
    }
  }

  emit(payload) {
    this.subscribers.forEach(subscriber => subscriber(payload));
  }
}