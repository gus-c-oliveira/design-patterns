/**
 * Chain of Responsibility (CoR)
 * 
 * In this pattern, requests are received by handlers
 * connected to each other in sequence. Each handler
 * decides whether to process the request and if the
 * request should be passed on the the next handler.
 * 
 * Each handler is an independent object that represents
 * one link in the CoR. They implement a common interface
 * and store a reference to the next handler in the chain.
 * 
 * Requests can be passed along the chain through all handlers
 * or until one of them decides not to pass it to the next
 * handler and stops further processing.
 * 
 * Useful when the application needs to process several
 * types of requests, but their exact type is unknown.
 * It can also be used to execute handlers in a specified
 * order, or when that order needs to be changed at runtime.
 * 
 * Important: a chain can receive requests at any point,
 * not just at its beginning. Also, each handler should
 * be capable of handling requests and can be used on its own.
 */

const REQUEST_PARAMS = {
  AUTHORIZED: 'authorized',
  UNAUTHORIZED: 'unauthorized',
  SAVE_TO_DATABASE: 'save to database',
  ALERT_USER: 'alert user'
};

abstract class Handler {
  private nextHandler: Handler;

  public setNext(handler: Handler) {
    this.nextHandler = handler;
    return this.nextHandler;
  }

  public handleRequest(params: string[]): string {
    return this.handleRequestPropagation(params);
  }

  protected handleRequestPropagation(params: string[]): string {
    if (this.nextHandler && this.shouldForwardRequest(params)) {
      return this.nextHandler.handleRequest(params);
    }
    return null;
  }

  protected abstract shouldForwardRequest(params: string[]): boolean;
}

class AuthHandler extends Handler {
  protected shouldForwardRequest(params:string[]): boolean {
    const authorized = params.indexOf(REQUEST_PARAMS.AUTHORIZED) !== -1;
    if (authorized) {
      console.log('Authorized user, forwarding...');
      return true;
    }
    console.log('User unauthorized, stopping process...');
    return false;
  }
}

class DatabaseHandler extends Handler {
  public handleRequest(params: string[]): string {
    if (params.indexOf(REQUEST_PARAMS.SAVE_TO_DATABASE) !== -1) {
      console.log('Saving request to database...');
    }
    return this.handleRequestPropagation(params);
  }

  protected shouldForwardRequest(params: string[]): boolean {
    return true;
  }
}

class AlertHandler extends Handler {
  public handleRequest(params: string[]): string {
    if (params.indexOf(REQUEST_PARAMS.ALERT_USER) !== -1) {
      console.log('Sending message to user...');
    }
    return this.handleRequestPropagation(params);
  }

  protected shouldForwardRequest(params: string[]): boolean {
    return false;
  }
}

const app = () => {
  console.log('Building the chain: auth -> database -> alert\n');
  const authHandler = new AuthHandler();
  const databaseHandler = new DatabaseHandler();
  const alertHandler = new AlertHandler();
  authHandler.setNext(databaseHandler).setNext(alertHandler);
  const requestParams = [
    [REQUEST_PARAMS.AUTHORIZED, REQUEST_PARAMS.SAVE_TO_DATABASE, REQUEST_PARAMS.ALERT_USER],
    [REQUEST_PARAMS.UNAUTHORIZED, REQUEST_PARAMS.SAVE_TO_DATABASE],
    [REQUEST_PARAMS.AUTHORIZED, REQUEST_PARAMS.ALERT_USER]
  ];
  console.log('Handling requests...\n');
  requestParams.forEach(params => {
    console.log(`Request params: ${params}`);
    authHandler.handleRequest(params);
    console.log('');
  });
};

app();
