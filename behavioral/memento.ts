/**
 * Memento
 * 
 * In the Memento pattern, an object saves its own
 * state, generating a memento object that can be
 * used to restore the state without creating dependencies
 * between the client code and the object's state.
 *
 * With the Memento pattern, complete copies of the state
 * can be created without needing to break encapsulation
 * of private fields.
 *
 * Client code can store a stack of mementos and use them
 * to restore state as needed. This is useful to implement
 * "undo" functionality and also when working with transactions,
 * when there's a need to perform a rollback.
 */

enum State {
  INIT = 'INIT',
  LOAD = 'LOAD',
  PROCESS = 'PROCESS',
  FINISH = 'FINISH'
}

class MachineMemento {
  public constructor(private state: State) { }

  public getState() {
    return this.state;
  }
}

class StateMachine {
  private state: State = State.INIT;

  public constructor() {
    console.log('Machine in initial state!');
  }

  public advanceCycle() {
    switch(this.state) {
      case State.INIT:
        this.state = State.LOAD;
        break;
      case State.LOAD:
        this.state = State.PROCESS;
        break;
      case State.PROCESS:
        this.state = State.FINISH;
        console.log('Process finished!');
        return ;
      case State.FINISH:
        this.state = State.INIT;
        console.log('Returned to initial state');
        return ;
    }
    console.log(`Advanced to state ${this.state}`);
  }

  public saveState() {
    console.log('Saving current state...');
    return new MachineMemento(this.state);
  }

  public restoreState(memento: MachineMemento) {
    this.state = memento.getState();
    console.log(`State restored to ${this.state}`);
  }
}

const app = () => {
  let memento: MachineMemento;
  const machine = new StateMachine();
  memento = machine.saveState();
  machine.advanceCycle();
  memento = machine.saveState();
  machine.advanceCycle();
  console.log(`Oooops, something is not going as planned... let's return one step:`);
  machine.restoreState(memento);
  console.log('Now everything is fine! Moving forward...');
  memento = machine.saveState();
  machine.advanceCycle();
  memento = machine.saveState();
  machine.advanceCycle();
};

app();
