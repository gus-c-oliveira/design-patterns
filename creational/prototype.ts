/**
 * Prototype
 * 
 * Allows clonning a object without making
 * code dependent on its class.
 * 
 * The Prototype pattern makes the clonning process
 * a responsibility of the object itself. It defines an
 * interface with a clone method. This method should
 * create and return a new object of the current class,
 * carrying all the properties of the cloned object.
 * 
 * An object that can be cloned is called prototype.
 * Cloning can be an alternative to subclasses by providing
 * clones that are configured in different ways.
 * 
 * Indicated for situations where code shouldn't rely on
 * specific classes of objects that need to be copied.
 * 
 * Important: objects in JS can't be cloned using the
 * = operator, because Objects are reference types. When
 * the = operator is applied to them, it copies the pointer
 * to the memory space it occupies, not the object itself.
 * 
 * There are alternatives for cloning objects, such as using
 * JSON.stringify/JSON.parse and lodash's cloning functions.
 */

interface Cloneable {
  clone: () => any;
}

interface Data {
  bio: {
    name: string;
    age: number;
  }
  ultra: boolean;
}

class Duplicant implements Cloneable {
  public constructor(public id: number, public data: Data) {}

  public clone() {
    const clone = Object.create(this);
    clone.data = Object.create(this.data);
    return clone;
  }
}

const app = () => {
  const duplicantData: Data = {
    bio: {
      name: 'Ivy',
      age: 27
    },
    ultra: true
  };
  const originalDuplicant = new Duplicant(7, duplicantData);
  console.log('Clonning...');
  const cloneDuplicant = originalDuplicant.clone();
  if (cloneDuplicant.id === originalDuplicant.id) {
    console.log('id was cloned!');
  } else {
    console.log('id was not cloned...');
  }
  if (cloneDuplicant.data = originalDuplicant.data) {
    console.log('data was cloned!');
  } else {
    console.log('data was not cloned...')
  }
};

app();
