/**
 * Command
 * 
 * In the Command pattern, requests are transformed
 * into independent objects that contain all the information
 * about them. Those objects follow a Command interface
 * which usually has a single method used to execute the command.
 * Request parameters are stored in command object fields,
 * and are provided during initialization via constructor.
 * 
 * Command objects are linked to other objects called senders.
 * Senders trigger the command, and the Command passes the request
 * to the receivers, which in turn process the requests. This creates
 * a separation between layers of the program and stimulates code reuse.
 * 
 * Applications include parameterizing objects with operations,
 * queueing and scheduling requests, and implementing reversible operations.
 */

interface Receiver {
  logMessage: (message: string) => void;
}

class UppercaseLogger implements Receiver {
  public logMessage(message: string) {
    console.log(message.toLocaleUpperCase());
  }
}

class LowercaseLogger implements Receiver {
  public logMessage(message:string) {
    console.log(message.toLocaleLowerCase());
  }
}

interface Command {
  execute: () => void;
}

class LogCommand implements Command {
  public constructor(
    private receiver: Receiver,
    private message: string
  ) {}

  public execute() {
    this.receiver.logMessage(this.message);
  }
}

class Sender {
  public command: Command;

  public executeCommand() {
    this.command.execute();
  }
}

const app = () => {
  const lowercaseLogger = new LowercaseLogger();
  const uppercaseLogger = new UppercaseLogger();
  const message = 'CoMmAnD eXaMpLe';
  const lowercaseCommand = new LogCommand(lowercaseLogger, message);
  const uppercaseCommand = new LogCommand(uppercaseLogger, message);
  const sender = new Sender();
  console.log('Triggering lowercase command...');
  sender.command = lowercaseCommand;
  sender.executeCommand();
  console.log('Triggering uppercase command using the same sender...');
  sender.command = uppercaseCommand;
  // Different command, same interface.
  sender.executeCommand();
};

app();
