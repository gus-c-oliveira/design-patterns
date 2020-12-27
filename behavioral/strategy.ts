/**
 * Strategy
 * 
 * This pattern allows changing between members
 * of a family of algorithms during runtime by
 * encapsulating each member in a class and making
 * their objects interchangeable.
 * 
 * Each strategy class implements a specific interface
 * that allows other objects to trigger their algorithms.
 * Objects that use strategies are called context objects.
 * 
 * Context objects have a field to store a reference for
 * an object that implements the strategy interface. At
 * runtime, it receives a strategy object and triggers
 * the strategy's algorithm instead of executing it on its own.
 * 
 * In this manner, the context object becomes independent
 * from the algorithm itself. New algorithms for the same
 * task can be included without making code harder to maintain.
 * 
 * Indicated for situations where similar classes or algorithms
 * only differ in the way they execute some operation, to
 * avoid having big conditionals to switch between variants.
 */

interface PrintStrategy {
  prepareForPrint: (data: string[]) => string;
}

class LowercaseSortedStrategy implements PrintStrategy {
  public prepareForPrint(data: string[]) {
    return data.sort().join('_').toLocaleLowerCase();
  }
}

class UppercaseReverseSortedStrategy implements PrintStrategy {
  public prepareForPrint(data: string[]) {
    return data.sort().reverse().join('_').toLocaleUpperCase();
  }
}

class Logger {
  public printStrategy: PrintStrategy;

  public logMessage(data: string[]) {
    if (!this.printStrategy) {
      console.log('Please set print strategy first!');
      return ;
    }
    const message = this.printStrategy.prepareForPrint(data);
    console.log(`Message: ${message}`);
  }
}

const app = () => {
  console.log('Creating a logger with LowercaseSortedStrategy');
  const logger = new Logger();
  const lowerStrategy = new LowercaseSortedStrategy();
  logger.printStrategy = lowerStrategy;
  const message = ['bAnAnA', 'pineapple', 'wATERMELon'];
  logger.logMessage(message);
  console.log('Changing strategy to UppercaseReverseSortedStrategy...');
  const upperStrategy = new UppercaseReverseSortedStrategy();
  logger.printStrategy = upperStrategy;
  logger.logMessage(message);
};

app();
