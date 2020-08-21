import nats, { Message, Stan } from 'node-nats-streaming'
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

abstract class Listener {
  abstract subject: string
  abstract queueGropName: string
  abstract onMessage(data: any, msg: Message): void
  private client: Stan
  protected ackWait = 5 * 1000

  constructor(client: Stan) {
    this.client = client
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGropName)
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGropName,
      this.subscriptionOptions(),
    )

    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGropName}`)

      const parseData = this.parseMessage(msg)
      this.onMessage(parseData, msg)
    })
  }

  parseMessage(msg: Message) {
    const data = msg.getData()
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf-8'))
  }
}
