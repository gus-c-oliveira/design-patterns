/**
 * Proxy
 * 
 * In the Proxy pattern, an object of a class is
 * substituted by another, the proxy, which follows
 * the same interface as the original object.
 * 
 * By using the proxy to control access to the
 * original object, it's possible to perform operations
 * before or after requests are processed by the
 * original object.
 * 
 * A proxy can be used for lazy initialization, instantiating
 * a service object only when it's needed. It can also
 * control access to the object's methods, handle specific
 * request details, keep a history of requests and cache results.
 */

interface DataService {
  getData: (params: string[]) => string;
}

class RealDataService implements DataService {
  public getData(params: string[]): string {
    console.log('Processing request for new data...');
    return params.join("*");
  }
}

// Example of proxy with cache:
class ProxyDataService implements DataService {
  private cache: { [key:string]: string } = {};
  public constructor(private service: RealDataService) { }

  public getData(params: string[]): string {
    const dataKey = this.getDataKey(params);
    if (!this.cache[dataKey]) {
      const result = this.service.getData(params);
      this.cache[dataKey] = result;
    }
    return this.cache[dataKey];
  }

  private getDataKey(params: string[]): string {
    return params.join('_').toLocaleUpperCase();
  }
}

const app = () => {
  const service = new RealDataService();
  const proxy = new ProxyDataService(service);
  console.log(`Let's make a request for data...`);
  const paramsFirstRequest = ['summer', 'watermelon'];
  console.log(`[summer, watermelon]: ${proxy.getData(paramsFirstRequest)}`);
  console.log(`Another request with different parameters:`);
  console.log(`[winter, chocolate]: ${proxy.getData(['winter', 'chocolate'])}`);
  console.log('Repeating the request for the same set of params, should return from cache:');
  console.log(`[summer, watermelon]: ${proxy.getData(paramsFirstRequest)}`);
}

app();
