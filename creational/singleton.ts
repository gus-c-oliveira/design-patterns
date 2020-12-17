/**
 * Singleton
 * 
 * This pattern ensures that a class has a single
 * instance at any time, controlling access to a
 * shared resource.
 * 
 * To implement the Singleton pattern, the constructor
 * of a class is defined as private, and a static creation
 * method is implemented. This creation method invokes the
 * constructor, saves it in a static private field and returns
 * the cached object to the client.
 */

class Unique {
  private static instance: Unique;

  private constructor() { }

  public static getInstance(): Unique {
    if (!Unique.instance) {
      Unique.instance = new Unique();
    }
    return Unique.instance;
  }
}

const app = () => {
  console.log(`Let's call getInstance twice...`);
  const firstInstance = Unique.getInstance();
  const secondInstance = Unique.getInstance();

  if (firstInstance === secondInstance) {
    console.log('Instances are the same, this is a Singleton!');
  } else {
    console.log('Instances are not the same, this is not a Singleton...');
  }
}

app();
