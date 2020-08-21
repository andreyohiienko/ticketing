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

  new TicketCreatedListener(stan).listen()
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

class TicketCreatedListener extends Listener {
  subject = 'ticket:created'
  queueGropName = 'payments-service'

  onMessage(data: any, msg: Message) {
    console.log('Event data!', data)

    msg.ack()
  }
}
