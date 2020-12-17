/**
 * Adapter
 * 
 * This pattern allows objects with incompatible
 * interfaces to communicate with each other.
 * 
 * The adapter wraps one of the objects and implements
 * an interface. Using the interface, client code can
 * invoke the adapter's methods in a safe manner.
 * 
 * When invoked, the adapter's methods communicate
 * the request to the wrapped object, in a format
 * that is compatible with it.
 * 
 * Adapters can also implement two-way communication,
 * converting data and method calls in both directions.
 * 
 * This pattern is indicated when there's the desire to
 * use a class, but the class is incompatible with
 * existing code.
 */

// DataService class defines the target interface:
class DataService {
  public getData(): string[] {
    return [
      'name: Angular',
      'version: 10',
      'language: TypeScript'
    ];
  }
}

// PersonalDataService does not conform to that interface:
interface PersonalData {
  name: string;
  fruit: string;
  season: string;
}

class PersonalDataService {
  private data: PersonalData = {
    name: 'Ivy',
    fruit: 'watermelon',
    season: 'spring'
  };

  public getData(): PersonalData {
    return this.data;
  }
}

// Adapter transforms the output of the PersonalDataService
// to conform to the target interface:
class DataServiceAdapter extends DataService {
  constructor(private personalService: PersonalDataService) {
    super();
  }

  public getData(): string[] {
    const originalData = this.personalService.getData();
    const adaptedData: string[] = [];
    Object.keys(originalData).forEach(key => adaptedData.push(`${key}: ${originalData[key]}`));
    return adaptedData;
  }
}

// Client code:
const dataLogger = (service: DataService) => {
  service.getData().forEach(data => console.log(`${data}\n`));
}

const app = () => {
  console.log('dataLogger works with DataService objects:\n');
  dataLogger(new DataService());
  console.log('\nAnd thanks to the adapter, it works with the PersonalDataService too:\n');
  dataLogger(new DataServiceAdapter(new PersonalDataService()));
}

app();
