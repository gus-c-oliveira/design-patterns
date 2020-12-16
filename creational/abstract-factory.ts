/**
 * Abstract Factory
 * 
 * Allows the creation of families of related objects
 * without specifying their concrete class.
 * 
 * In this pattern, interfaces are created for each type of
 * object in an object family, and each variation of those
 * objects implements those interfaces.
 * 
 * Along with the object interfaces, a second kind of interface is
 * created: the interface for the Abstract Factory. This
 * interface lists creation methods for all types of object
 * inside a family. These methods return the object interfaces
 * previously mentioned.
 * 
 * For each family variant, a concrete factory class is created
 * based on the Abstract Factory interface. This concrete factory
 * returns objects of a single family of objects. Therefore, objects
 * of two different families are never mixed together. 
 * 
 * Client code interacts with both objects and factories using their
 * interfaces, and never their concrete implementations.
 * 
 * Indicated for situations where code needs to work with a range
 * of object families, but those families might be unknown or
 * be extended in the future.
 */

// Each family of painting materials is defined
// by a Pencil, an Eraser and a Brush.
interface Pencil {
  sketch: () => void;
}

interface Eraser {
  erase: () => void;
}

interface Brush {
  paint: () => void;
}

// Concrete families:
class EdgyPencil implements Pencil {
  public sketch() {
    console.log(`I draw sharp edges!`);
  }
}

class EdgyEraser implements Eraser {
  public erase() {
    console.log(`I erase unwanted lines with quick, sharp movements!`);
  }
}

class EdgyBrush implements Brush {
  public paint() {
    console.log(`I paint my drawing with vigorous strokes!`);
  }
}

class CutePencil implements Pencil {
  public sketch() {
    console.log(`I draw sinuous lines!`);
  }
}

class CuteEraser implements Eraser {
  public erase() {
    console.log(`I softly erase any unintended curves!`);
  }
}

class CuteBrush implements Brush {
  public paint() {
    console.log(`I paint my drawing with light strokes!`);
  }
}

// Abstract Factory interface:
interface PaintingMaterialsFactory {
  getPencil: () => Pencil;
  getEraser: () => Eraser;
  getBrush: () => Brush;  
}

// Concrete factories:
class EdgyMaterialsFactory implements PaintingMaterialsFactory {
  public getPencil() {
    return new EdgyPencil();
  }

  public getEraser() {
    return new EdgyEraser();
  }

  public getBrush() {
    return new EdgyBrush();
  }
}

class CuteMaterialsFactory implements PaintingMaterialsFactory {
  public getPencil() {
    return new CutePencil();
  }

  public getEraser() {
    return new CuteEraser();
  }

  public getBrush() {
    return new CuteBrush();
  }
}

// Client code:
const app = (materials: PaintingMaterialsFactory) => {
  console.log('\nTime for a new masterpiece!\n');
  const pencil = materials.getPencil();
  pencil.sketch();
  const eraser = materials.getEraser();
  eraser.erase();
  const brush = materials.getBrush();
  brush.paint();
  console.log('\nBeautiful!\n');
};

console.log('\nLaunching app using EdgyMaterialsFactory:\n');
app(new EdgyMaterialsFactory());
console.log('\nLaunching app using CuteMaterialsFactory:\n');
app(new CuteMaterialsFactory());
