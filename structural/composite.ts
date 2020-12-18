/**
 * Composite / Object Tree
 * 
 * In this pattern, objects are organized in
 * tree structures. These structures can be worked
 * with as if they were single objects.
 * 
 * The tree is composed of two types of objects:
 * leaves and containers. A leaf is the basic element
 * of the tree and doesn't have any subcomponents.
 * A container can have both leaves and containers as
 * subcomponents.
 * 
 * When receiving a request, containers delegate most of
 * the work to their subcomponents, then aggregate and
 * return the results their client. Therefore, this pattern
 * allows the execution of an operation recursively over
 * the components of the tree.
 * 
 * Both types implement a Component interface which
 * describes operations available for both leaves and
 * containers. Interactions between the tree structure
 * and the client code, and between containers and leaves
 * happen through the component interface.
 * 
 * Indicated for situations where it's desirable for the
 * client code to treat both leaves and containers in
 * the same manner, and where the core model of the app
 * allows for a tree representation.
 */

abstract class TreeComponent {
  protected parent: TreeComponent;

  public constructor(protected cost: number) { }

  public abstract getTotalCost(): number;

  public isContainer(): boolean {
    return false;
  }

  public setParent(component: TreeComponent) {
    this.parent = component;
  }

  public getParent() {
    return this.parent;
  }

  /**
   * Having these methods on leaves violates the
   * Interface Segregation Principle, but allows the
   * client to treat all TreeComponents the same way.
   */
  public addChild(component: TreeComponent) { }

  public removeChild(component: TreeComponent) { }
}

class LeafComponent extends TreeComponent {
  public getTotalCost(): number {
    return this.cost;
  }
}

class ContainerComponent extends TreeComponent {
  private children: TreeComponent[] = [];

  public isContainer(): boolean {
    return true;
  }

  public addChild(component: TreeComponent) {
    component.setParent(this);
    this.children.push(component);
  }

  public removeChild(component: TreeComponent) {
    component.setParent(null);
    this.children = this.children.filter(item => item !== component);
  }

  public getTotalCost() {
    let childrenCost = 0;
    this.children.forEach(child => childrenCost += child.getTotalCost());
    return this.cost + childrenCost;
  }
}

const app = () => {
  console.log(`Let's have a package containing one item and another package with 2 items inside...`);
  const mainPackage = new ContainerComponent(15);
  const mediumItem = new LeafComponent(10);
  const smallPackage = new ContainerComponent(7);
  const smallItem = new LeafComponent(5);
  const smallerItem = new LeafComponent(3);
  mainPackage.addChild(mediumItem);
  mainPackage.addChild(smallPackage);
  smallPackage.addChild(smallItem);
  smallPackage.addChild(smallerItem);
  console.log(
    `The total cost of the main package is: $${mainPackage.getTotalCost().toFixed(2)}`
  );
};

app();
