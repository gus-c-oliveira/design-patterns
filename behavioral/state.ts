/**
 * State
 * 
 * The State pattern allows an object to change
 * its behavior according to internal state changes.
 * 
 * The object holds a reference to a state object.
 * State objects can be set dynamically and each comes
 * from a different class that implements a state interface
 * and executes a state-specific behavior. Therefore,
 * the object delegates all computations dependent
 * on the state to the state objects.
 * 
 * Transitions from one state to another happen by
 * changing the state reference inside the object.
 * This change of state can be triggered by the client
 * code or by the states themselves.
 * 
 * This pattern can be used to prevent long if-else chains
 * or switch statements in objects that need to change
 * behavior dynamically.
 */

abstract class MachineState {
  protected machine: Machine;

  public constructor(protected name: string) { }

  public setMachine(machine: Machine) {
    this.machine = machine;
  }

  public getName() {
    return this.name;
  }

  public abstract execute();
}

class Machine {
  private state: MachineState;

  public constructor(state: MachineState) {
    this.setState(state);
  }

  public setState(state: MachineState) {
    this.state = state;
    this.state.setMachine(this);
    console.log(`Transitioned to ${state.getName()}`);
  }

  public execute() {
    this.state.execute();
  }
}

class UpperState extends MachineState {
  public execute() {
    console.log(`Executing ${this.name}...`.toLocaleUpperCase());
    this.machine.setState(new LowerState('lower'));
  }
}

class LowerState extends MachineState {
  public execute() {
    console.log(`Executing ${this.name}...`.toLocaleLowerCase());
    this.machine.setState(new UpperState('upper'));
  }
}

const app = () => {
  console.log('Creating machine...');
  const machine = new Machine(new LowerState('lower'));
  // Same interface, different behavior based on state:
  machine.execute();
  machine.execute();
};

app();
