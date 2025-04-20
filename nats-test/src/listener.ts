import { randomBytes } from 'crypto';
import nats, { Message, Stan } from 'node-nats-streaming';
import { TicketCreatedListener } from './events/ticket-created-listener';
//this is the listener for the ticket created event


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

    new TicketCreatedListener(stan).listen();
    //this is where we create a new instance of the TicketCreatedListener class and call the listen method to start listening for events

});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
//this is to close the connection when the process is terminated, so that we can clean up the resources and avoid memory leaks





