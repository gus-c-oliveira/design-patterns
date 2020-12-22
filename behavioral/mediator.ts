/**
 * Mediator
 * 
 * In the Mediator pattern, classes that work together
 * are decoupled from each other by ceasing all direct
 * communication and calling only a mediator object
 * that redirects calls to the appropriate handlers.
 * 
 * Every component contains a reference to the mediator,
 * declared with the mediator interface. When an event happens
 * or a request needs to be sent, the component sends
 * a notification to the mediator. The mediator then
 * handles that notification, passing to the component
 * responsible for processing it. This way, components
 * that work together become unaware of other components,
 * since all communication happens through the mediator.
 * 
 * Mediators encapsulate the relations between objects,
 * reduciding dependencies on concrete classes and
 * making code easier to maintain and reuse.
 */

interface Mediator {
  notify: (event: string) => void;
}

class BaseFormComponent {
  protected mediator: Mediator;

  public setMediator(mediator: Mediator) {
    this.mediator = mediator;
  }

  protected sendNotification(event: string) {
    if (this.mediator) {
      this.mediator.notify(event);
    }
  }
}

class ResetButton extends BaseFormComponent {
  private disabled = true;

  public enable() {
    console.log('Enabling reset button...');
    this.disabled = false;
  }

  public click() {
    if (this.disabled) {
      return ;
    }
    this.sendNotification('Reset');
    this.disabled = true;
  }
}

class Checkbox extends BaseFormComponent {
  private marked = false;

  public clear() {
    console.log('Clearing checkbox...');
    this.marked = false;
  }

  public click() {
    this.marked = true;
    this.sendNotification('CheckboxMarked');
  }
}

class FormMediator implements Mediator {
  public constructor(
    private button: ResetButton,
    private checkbox: Checkbox
  ) {
    this.button.setMediator(this);
    this.checkbox.setMediator(this);
  }

  public notify(event: string) {
    this[`handle${event}`]
      ? this[`handle${event}`]()
      : console.log('Unhandled event!');
  }

  private handleCheckboxMarked() {
    console.log('Mediator received CheckboxMarked event!');
    this.button.enable();
  }

  private handleReset() {
    console.log('Mediator received Reset event!');
    this.checkbox.clear();
  }
}

const app = () => {
  console.log('Simulating a simple form with a checkbox and a reset button:');
  const button = new ResetButton();
  const checkbox = new Checkbox();
  const mediator = new FormMediator(button, checkbox);
  console.log('\nClicking checkbox...');
  checkbox.click();
  console.log('\nClicking reset button...');
  button.click();
};

app();
