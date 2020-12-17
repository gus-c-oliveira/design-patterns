/**
 * Bridge
 * 
 * The Bridge pattern allows the split of a large class into
 * separate, related class hierarchies, responsible for
 * independent dimensions of the original class.
 * 
 * By switching from inheritance to composition, the
 * extracted dimension of the original class becomes
 * represented by an object (Implementation) that is referenced
 * by the class from which it was extracted (Abstraction).
 * 
 * In this pattern, the Abstraction describes high-level
 * logic and relies on the Implementation to do the actual work.
 * Both communicate using methods declared in the
 * implementation's interface.
 * 
 * Since the two hierarchies are independent, it's possible to
 * extend them separately.
 * 
 * This pattern is used when it's desired to divide a large class
 * with several versions of the same functionality, to extend such
 * class in independent dimensions, or to change implementations
 * at runtime.
 */

// Implementation interface:
interface MessageTransformer {
  transform: (message: string) => string;
}

// Concrete implementations:
class BigMessageTransformer implements MessageTransformer {
  public transform(message: string): string {
    return message.toLocaleUpperCase();
  }
}

class SmallMessageTransformer implements MessageTransformer {
  public transform(message: string): string {
    return message.toLocaleLowerCase();
  }
}

// Abstraction
class MessageHandler {
  public constructor(
    protected transformer: MessageTransformer,
    protected message: string
  ) { }

  public setTransformer(transformer: MessageTransformer) {
    this.transformer = transformer;
  }

  public logMessage() {
    const transformedMessage = this.transformer.transform(this.message);
    console.log(`Transformed Message: ${transformedMessage}\n`);
  }
}

// The abstraction can be extended independently of the implementation:
class ExtraMessageHandler extends MessageHandler {
  public logMessage() {
    const transformedMessage = this.transformer.transform(this.message);
    console.log(`Extra, extra! ${transformedMessage}\n`);
  }
}

// Client code:
const app = () => {
  const message = 'ThIs Is An ExAmPlE oF tHe BrIdGe PaTtErN';
  console.log('A MessageHandler with a SmallMessageTransformer:\n');
  const smallTransformer: MessageTransformer = new SmallMessageTransformer();
  const handler = new MessageHandler(smallTransformer, message);
  handler.logMessage();
  console.log('Change to a BigMessageTransformer:\n');
  const bigTransformer = new BigMessageTransformer();
  handler.setTransformer(bigTransformer);
  handler.logMessage();
  console.log('ExtraMessageHandler works with both transformers too:\n');
  const extraHandler = new ExtraMessageHandler(bigTransformer, message);
  extraHandler.logMessage();
  extraHandler.setTransformer(smallTransformer);
  extraHandler.logMessage();
};

app();
