/**
 * Iterator
 * 
 * An Iterator is an object associated with a
 * collection that encapsulates its traversal behavior.
 * 
 * Iterators implement a common interface that allows
 * client code to interact with the collection without
 * exposing the collection's structure to it.
 * 
 * A collection may have several iterators associated
 * to them, each implementing a different traversal
 * behavior.
 * 
 * Indicated for hiding complex data structures from
 * client code, promoting code reuse, and when there's a
 * need to traverse a collection, but its specific
 * type may be unknown.
 */

interface FoodIterator<T> {
  current: () => T;
  next: () => T;
  validPosition: () => boolean;
}

interface FoodData {
  name: string;
  energy: number;
}

class FoodCollection {
  private foods: FoodData[] = [];

  public addFood(food: FoodData) {
    this.foods.push(food);
  }

  public getFoods() {
    return this.foods;
  }

  public getIterator() {
    return new FoodNameIterator(this);
  }
}

class FoodNameIterator implements FoodIterator<FoodData> {
  private position = 0;
  private data: FoodData[] = [];
  
  public constructor(collection: FoodCollection) {
    this.data = collection.getFoods().sort((a, b) => a.name > b.name ? 1 : -1);
  }

  public current() {
    if (!this.validPosition()) {
      return null;
    }
    return this.data[this.position];
  }

  public next() {
    const item = this.data[this.position];
    this.position += 1;
    return item;
  }

  public validPosition() {
    return this.position < this.data.length;
  }

  public reset() {
    this.position = 0;
  }
}

const app = () => {
  console.log('Creating food collection...');
  const collection = new FoodCollection();
  collection.addFood({ name: 'watermelon', energy: 3 });
  collection.addFood({ name: 'chocolate', energy: 10 });
  collection.addFood({ name: 'egg', energy: 1 });
  const iterator = collection.getIterator();
  console.log('Listing foods...');
  while (iterator.validPosition()) {
    console.log(iterator.next());
  }
};

app();
