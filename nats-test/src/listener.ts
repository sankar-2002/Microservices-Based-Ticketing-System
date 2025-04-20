import { randomBytes } from 'crypto';
import nats, { Message, Stan } from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

//here the clientId is a random string, because we need to create a new clientID every time we run the listener 

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    });
    //this is a listener for the close event, which is emitted when the connection to NATS is closed

    const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('accounting-service');

    //listener receives messages from the queue group ad does some post processing 
    //if it fails how will we know that the message was not processed?
    //that's where the ackWait comes in, 

    const subscription = stan.subscribe(
        'ticket:created',
         'queue-group-name',  
          options
    );

    //adding a queue group to the subscription, so that we can send messages to only one of the subscribers in the group
    // this is useful when we have multiple instances of the same service running, and we want to load balance the messages between them

    subscription.on('message', (msg:Message) => {
        // console.log('Message received');

        const data = msg.getData();

        if(typeof data === 'string') {
            console.log(`Received data: ${msg.getSequence()}, with data: ${data}`);
        }
        //acknowledge the message after processing it
        msg.ack();
    });
});

    // subscription.on('error', (err) => {
    //     console.error(`Subscription error: ${err.message}`);
    // }

    process.on('SIGINT', () => stan.close());
    process.on('SIGTERM', () => stan.close());
    //this is to close the connection when the process is terminated, so that we can clean up the resources and avoid memory leaks

abstract class Listener {

  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
    .subscriptionOptions()
    .setDeliverAllAvailable()
    .setManualAckMode(true)
    .setAckWait(this.ackWait)
    .setDurableName(this.queueGroupName);
  }

    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        )

        subscription.on('message', (msg: Message) => {
            console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        })
    }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'))
  }

}

class TicketCreatedListener extends Listener {
    subject = 'ticket:created';
    queueGroupName = 'payments-service';
  
    onMessage(data: any, msg: Message) {
      console.log('Event data!', data);
  
      msg.ack();
    }
}


