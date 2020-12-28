/**
 * Visitor
 * 
 * In the Visitor pattern, algorithms are implemented
 * in separate classes called visitors, distinct from
 * the ones they operate on.
 * 
 * The original object that will be processed by the
 * algorithm receives the visitor object and calls the
 * adequate method, passing itself as an argument.
 * 
 * This pattern allows the application of an algorithm in
 * complex data structures with elements of different
 * classes: just pass the visitor and call the appropriate
 * method. It also encapsulates auxiliary behavior, separating
 * it from the business logic inside classes.
 */

interface Database {
  executeVisitor: (visitor: Visitor) => void;
}

class StringDatabase implements Database {
  public constructor(public data: string[]) { }

  public executeVisitor(visitor: Visitor) {
    visitor.logStringDatabase(this);
  }
}

class NumberDatabase implements Database {
  public constructor(public data: number[]) { }

  public executeVisitor(visitor: Visitor) {
    visitor.logNumberDatabase(this);
  }
}

interface Visitor {
  logStringDatabase: (database: StringDatabase) => void;
  logNumberDatabase: (database: NumberDatabase) => void;
}

class LoggerVisitor implements Visitor {
  public logStringDatabase(database: StringDatabase) {
    console.log('Visitor is logging StringDatabase:');
    console.log(database.data.sort().join('_'));
  }

  public logNumberDatabase(database: NumberDatabase) {
    console.log('Visitor is logging NumberDatabase:');
    console.log(database.data.sort());
  }
}

const app = () => {
  const numberDatabase = new NumberDatabase([4, 2, 6, 8, 3]);
  const stringDatabase = new StringDatabase(['pinneapple', 'cake', 'chocolate', 'melon']);
  const visitor = new LoggerVisitor();
  numberDatabase.executeVisitor(visitor);
  stringDatabase.executeVisitor(visitor);
};

app();
