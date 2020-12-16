/**
 * Factory Method
 * 
 * Gives an interface for instantiating objects in a superclass,
 * and also allows subclasses to change the type of object created.
 * 
 * In the Factory Method, objects are created with calls to a
 * factory method, instead of being directly instantiated. This factory
 * method has a return type which is declared as an interface.
 * 
 * Subclasses can override the factory method to change the type of object
 * instantiated, as long as this new type implements the interface.
 * 
 * This allows for the encapsulation of parts of the code that are
 * susceptible to change and also code reuse. The client doesn't see a
 * difference between the different types of object, as long as they all
 * implement the factory's interface.
 * 
 * Indicated for situations where the exact type of the objects
 * in the code being written is unclear.
 */

// Factory return type:
interface Food {
  energy: number;
  name: string;

  eat: () => void;
}

// Concrete products:
class DarkChocolate implements Food {
  public energy = 5;
  public name = 'dark chocolate';

  public eat() {
    console.log(`I love ${this.name}!`);
  }
}

class Watermelon implements Food {
  public energy = 3;
  public name = 'watermelon';

  public eat() {
    console.log(`Summer is perfect for eating a ${this.name}!`);
  }
}

// Abstract creator class:
abstract class Foodie {
  // Factory method:
  public abstract getFood(): Food;

  public eatFood(): void {
    const food = this.getFood();
    console.log(`Now eating ${food.name}...`);
    food.eat();
    console.log(`My energy has increased in ${food.energy} points!`);
  }
}

// Concrete creators:
class ChocolateFoodie extends Foodie {
  public getFood(): Food {
    return new DarkChocolate();
  }
}

class FruitFoodie extends Foodie {
  public getFood(): Food {
    return new Watermelon();
  }
}

// Client code:
const app = (foodie: Foodie) => {
  foodie.eatFood();
};

console.log('\nLaunching app using ChocolateFoodie:\n');
app(new ChocolateFoodie());
console.log('\nLaunching app using FruitFoodie:\n');
app(new FruitFoodie());
