import nats, { Message } from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', '123', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');
    const subscription = stan.subscribe('ticket:created');

    subscription.on('message', (msg:Message) => {
        console.log('Message received');
        const data = msg.getData();

        if(typeof data === 'string') {
            console.log(`Received data: ${msg.getSequence()}, with data: ${data}`);
        }
    });

    // subscription.on('error', (err) => {
    //     console.error(`Subscription error: ${err.message}`);
    // }
});