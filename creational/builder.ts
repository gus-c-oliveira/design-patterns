/**
 * Builder
 * 
 * The Builder pattern allows for the creation of complex
 * objects through a series of steps, allowing reuse of
 * construction code.
 * 
 * In this pattern, the object construction code is extracted
 * out of its own class and refactored into builders. Builders
 * organize the initialization of an object into a series of steps,
 * which can be executed to create a new object instance.
 * 
 * Steps can be called as needed, avoiding constructors with
 * multiple unused parameters.
 * 
 * Construction steps that need different implementations for
 * variations of the object can be implemented through several
 * different builder classes. Builders may return objects that
 * do not implement a common interface.
 * 
 * The series of calls for each builder can be isolated into a
 * Director class. The director defines the order in which steps
 * are executed, isolating construction code from the client.
 */

// Builder interface:
interface CarBuilder {
  installSeats: () => void;
  installEngine: () => void;
  installRadio: () => void;
}

class Car {
  public parts: string[] = [];

  public listParts() {
    console.log('These are the parts of this car:\n');
    this.parts.forEach(part => console.log(`${part}\n`));
  }
}

// Concrete builder:
class SportsCarBuilder implements CarBuilder {
  private car = new Car();

  public installSeats() {
    this.car.parts.push('2 seats');
  }

  public installEngine() {
    this.car.parts.push('black horse engine');
  }

  public installRadio() {
    this.car.parts.push('sonic boom radio');
  }

  public getCar() {
    const car = this.car;
    this.car = new Car();
    return car;
  }
}

class CarDirector {
  private builder: CarBuilder;

  public setBuilder(builder: CarBuilder) {
    this.builder = builder;
  }

  public makeCar() {
    this.builder.installSeats();
    this.builder.installEngine();
    this.builder.installRadio();
  }
}

// Client code:
const app = () => {
  console.log(`Let's build a car!\nCreating...`);
  const builder = new SportsCarBuilder();
  const director = new CarDirector();
  director.setBuilder(builder);
  director.makeCar();
  const car = builder.getCar();
  console.log('Car is done!');
  car.listParts();
};

app();
