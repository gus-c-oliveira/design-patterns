/**
 * Facade
 * 
 * The Facade enables the client code to interact
 * with a complex system by providing a simplified
 * interface, decoupling the client's logic from
 * the system's implementation details.
 * 
 * The facade receives the client's requests and redirects
 * it to the system hidden behind it, handling all the
 * specific details and returning the results to the client.
 * 
 * It's very useful when itegrating apps with 3rd party
 * software that has dozens of features, but only few
 * are of interest.
 * 
 * It also helps code maintenance by minimizing the effort
 * of upgrading or replacing the systems hidden by the facade.
 * The only thing that is needed to change is the facade,
 * not the client's code.
 */

class Formatter {
  public static addTimestamp(s:string): string {
    const now = new Date().toLocaleDateString();
    return `[${now}]: ${s}`;
  }

  public static toUppercase(s:string): string {
    return s.toLocaleUpperCase();
  }

  public static decorateString(s:string): string {
    return `** ${s} **`;
  }
}

class FormatterFacade {
  public format(s:string): string {
    let formatted = s;
    formatted = Formatter.toUppercase(formatted);
    formatted = Formatter.addTimestamp(formatted);
    formatted = Formatter.decorateString(formatted);
    return formatted;
  }
}

// Client code:
const app = () => {
  const facade = new FormatterFacade();
  const message = 'facade example';
  console.log(`Original message:\n${message}`);
  // To format a string, the client code only interacts with the Facade
  // using a simple interface. The facade handles the details:
  console.log(`Formatted message:\n${facade.format(message)}`);
};

app();
