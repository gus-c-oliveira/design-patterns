/**
 * Observer
 * 
 * In the Observer pattern, a subscription
 * mechanism allows multiple objects to listen
 * and react to events happening in another object.
 * 
 * The object that produces events is called subject,
 * while the ones that track changes to the subject's
 * state are the subscribers.
 * 
 * Subscribers implement an interface that allows a
 * subject to inform them of events. The subject stores
 * references to its subscribers and when an event happens,
 * it informs the subscribers by calling the method declared
 * in the subscriber interface.
 * 
 * This pattern is indicated in situations where changes in
 * one object may trigger changes in other objects, and
 * the actual group of object is unknown or can change
 * at runtime.
 */

interface Subscriber {
  receiveEvent: (event: string) => void;
}

interface Subject {
  addSubscriber: (subscriber: Subscriber) => void;
  removeSubscriber: (subscriber: Subscriber) => void;
  emitEvent: (event: string) => void;
}

class Messenger implements Subject {
  private subscribers: Subscriber[] = [];

  public addSubscriber(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }

  public removeSubscriber(subscriber: Subscriber) {
    this.subscribers = this.subscribers.filter(s => s !== subscriber);
  }

  public emitEvent(event: string) {
    console.log(`Emitting event: ${event}`);
    this.subscribers.forEach(s => s.receiveEvent(event));
  }
}

class UppercaseLogger implements Subscriber {
  public receiveEvent(event: string) {
    console.log('UppercaseLogger reacting to event:');
    console.log(event.toLocaleUpperCase());
  }
}

class LowercaseLogger implements Subscriber {
  public receiveEvent(event: string) {
    console.log('LowercaseLogger reacting to event:');
    console.log(event.toLocaleLowerCase());
  }
}

const app = () => {
  const messenger = new Messenger();
  const lowerLogger = new LowercaseLogger();
  const upperLogger = new UppercaseLogger();
  console.log(`Adding lowercase logger to the list of messenger's subscribers...`);
  messenger.addSubscriber(lowerLogger);
  messenger.emitEvent('FIRST event');
  console.log(`Adding uppercase logger to the list of messenger's subscribers...`);
  messenger.addSubscriber(upperLogger);
  messenger.emitEvent('second EVENT');
  console.log(`Removing lowercase logger to the list of messenger's subscribers...`);
  messenger.removeSubscriber(lowerLogger);
  messenger.emitEvent('ThIrD eVeNt');
};

app();
