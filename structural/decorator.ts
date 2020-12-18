/**
 * Decorator / Wrapper
 * 
 * This pattern is used to attach new behaviors
 * to objects by wrapping them inside other
 * objects that contain the desired behavior.
 * 
 * This pattern uses composition to avoid undesired
 * effects of extending behavior by inheritance, such as
 * having to create a great number of subclasses to
 * implement different variations of the behavior.
 * 
 * In this pattern, a common interface is defined for
 * decorators and wrapped objects. A decorator contains
 * a reference to the wrapped object and delegates operations
 * to it. Before or after calling the wrapped object's method,
 * a decorator can execute its extra behavior to change
 * the response returned to the client.
 * 
 * Decorators can wrap each other, creating multiple layers.
 * Then, the output is the result of the combined effect
 * of all the decorators.
 * 
 * Indicated for situations where it's desired to change
 * behaviors at runtime without breaking client code, or when
 * extending behavior via inheritance is problematic.
 */

// Common interface
interface Formatter {
  format: (s: string) => string;
}

class SimpleFormatter implements Formatter {
  public format(s: string): string {
    return s.toLocaleLowerCase();
  }
}

abstract class BaseDecorator implements Formatter {
  public constructor(protected formatter: Formatter) { }

  public format(s: string): string {
    return this.formatter.format(s);
  }
}

class UnderscoreDecorator extends BaseDecorator {
  public format(s: string): string {
    return `_${this.formatter.format(s)}_`;
  }
}

class AsteriskFormatter extends BaseDecorator {
  public format(s:string): string {
    return `***${this.formatter.format(s)}***`;
  }
}

const app = () => {
  const message = 'DeCoRaToR EXAMPLE';
  console.log(`Logging message using SimpleFormatter:`);
  const simpleFormatter = new SimpleFormatter();
  console.log(simpleFormatter.format(message));
  console.log(`Wrapping in UnderscoreDecorator:`);
  const underscoreDecorator = new UnderscoreDecorator(simpleFormatter);
  console.log(underscoreDecorator.format(message));
  console.log(`Wrapping in UnderscoreDecorator and AsteriskFormatter:`);
  const asteriskDecorator = new AsteriskFormatter(underscoreDecorator);
  console.log(asteriskDecorator.format(message));
  console.log();
};

app();
