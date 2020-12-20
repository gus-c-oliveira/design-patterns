/**
 * Flyweight
 * 
 * In the flyweight pattern, common parts of the
 * state of multiple objects are shared between
 * them, instead of being stored repeatedly and
 * individually in each of them.
 * 
 * The intrinsic state is the constant data inside
 * of an object. The extrinsic state represents
 * the rest of the state.
 * 
 * In the Flyweight pattern, the intrinsic state
 * and the object's behavior are stored in a Flyweight
 * class. Its state is immutable and set in the constructor.
 * Multiple Flyweight objects can exist to represent
 * different intrinsic states, and they can be managed
 * by a Flyweight Factory.
 * 
 * The Context class stores the extrinsic state for
 * each object. The combination of the context and
 * the flyweight gives the full state of the object.
 * 
 * Indicated for situations where the program must
 * have a huge number of objects that contain unchanging
 * duplicated data.
 */

interface TaxonomicFamilyData {
  domain?: string;
  kingdom?: string;
  phylum?: string;
  class?: string;
  order?: string;
  family?: string;
}

const UNKNOWN = 'unknown';

class TaxonomicFamilyFlyweight {
  private domain: string;
  private kingdom: string;
  private phylum: string;
  private class: string;
  private order: string;
  private family: string;

  public constructor(data: TaxonomicFamilyData) {
    this.domain = data.domain || UNKNOWN;
    this.kingdom = data.kingdom || UNKNOWN;
    this.phylum = data.phylum || UNKNOWN;
    this.class = data.class || UNKNOWN;
    this.order = data.order || UNKNOWN;
    this.family = data.family || UNKNOWN;
  }

  public logTaxonomyInfo(animalData: { genus: string, species: string }) {
    console.log('Here is the taxonomic data for this animal:');
    console.log(`Domain: ${this.domain}`);
    console.log(`Kingdom: ${this.kingdom}`);
    console.log(`Phylum: ${this.phylum}`);
    console.log(`Class: ${this.class}`);
    console.log(`Order: ${this.order}`);
    console.log(`Family: ${this.family}`);
    console.log(`Genus: ${animalData.genus || UNKNOWN}`);
    console.log(`Species: ${animalData.species || UNKNOWN}`);
  }
}

class Animal {
  private family: TaxonomicFamilyFlyweight;
  private genus: string;
  private species: string;

  public constructor(animalData: {
    family: TaxonomicFamilyFlyweight,
    genus: string,
    species: string
  }
  ) {
    this.family = animalData.family;
    this.genus = animalData.genus || UNKNOWN;
    this.species = animalData.species || UNKNOWN;
  }

  public logAnimalInfo() {
    this.family.logTaxonomyInfo({
      genus: this.genus,
      species: this.species
    });
  }
}

const app = () => {
  const canidaeFamily = new TaxonomicFamilyFlyweight({
    domain: 'eukarya',
    kingdom: 'animalia',
    phylum: 'chordata',
    class: 'mammalia',
    order: 'carnivora',
    family: 'canidae'
  });
  const vulpes = new Animal({
    family: canidaeFamily,
    genus: 'vulpes',
    species: 'vulpes lagopus'
  });
  const urocyon = new Animal({
    family: canidaeFamily,
    genus: 'urocyon',
    species: 'urocyon cinereoargenteus'
  });
  vulpes.logAnimalInfo();
  console.log('');
  urocyon.logAnimalInfo();
};

app();
