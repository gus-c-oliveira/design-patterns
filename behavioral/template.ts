/**
 * Template Method
 * 
 * In this pattern, an algorithm is broken down into a
 * series of steps, each one represented by a method
 * inside an abstract base class. The base class provides
 * a template method for triggering the algorithm,
 * and the subclasses override the steps to implement
 * variations of the algorithm.
 * 
 * The template method may also include hooks, which are
 * optional steps with an empty body placed usually before
 * or after important parts of the algorithm. These hooks
 * provide additional points for customization.
 * 
 * Indicated when it's desirable to allow client code
 * to change particular steps of an algorithm, but
 * not its structure. This can also be used to reduce
 * code duplication between classes with almost identical
 * functions.
 */

abstract class BaseDataLogger {
  // Template method
  public logData(data: string[]) {
    const ordered = this.orderData(data);
    const formatted = this.formatData(ordered);
    const decorated = this.decorateData(formatted);
    console.log(`This is your data: ${decorated.join(' ')}`);
  }

  protected orderData(data: string[]) {
    return data.sort();
  }

  protected abstract formatData(data: string[]): string[];

  protected abstract decorateData(data: string[]): string[];
}

class UpperLogger extends BaseDataLogger {
  protected formatData(data: string[]) {
    return data.map(item => item.toLocaleUpperCase());
  }

  protected decorateData(data:string[]) {
    return data.map(item => `** ${item} **`);
  }
}

class LowerLogger extends BaseDataLogger {
  protected orderData(data: string[]) {
    return data.sort().reverse();
  }
  protected formatData(data: string[]) {
    return data.map(item => item.toLocaleLowerCase());
  }

  protected decorateData(data:string[]) {
    return data.map(item => `# ${item} #`);
  }
}

const app = () => {
  const data = ['piNNEapple', 'cake', 'chocoLATE', 'waTERMElon'];
  console.log('Using LowerLogger to print data:');
  const lowerLogger = new LowerLogger();
  lowerLogger.logData(data);
  console.log('Using UpperLogger to print data:');
  const upperLogger = new UpperLogger();
  upperLogger.logData(data);
};

app();
