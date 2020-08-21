import nats, { Message } from 'node-nats-streaming'
import { randomBytes } from 'crypto'

console.clear()

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
})

stan.on('connect', () => {
  console.log('Listener connected to nats')

  stan.on('close', () => {
    console.log('NATS connection closed')
    process.exit()
  })

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable() // 1
    .setDurableName('accounting-service') // 2

  const subscription = stan.subscribe(
    'ticket:created',
    'queue-group-name', // 3 - to make sure that we do not accidentlly dumped durable name even if all of our services restart for a very brief period of time
    options,
  )
  subscription.on('message', (msg: Message) => {
    const data = msg.getData()

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`)
    }

    msg.ack()
  })
})

process.on('SIGINT', () => stan.close()) // INTERRUPT SIGNALS
process.on('SIGTERM', () => stan.close()) // TERMINATE SIGNALS
