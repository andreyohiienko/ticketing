import { Message } from 'node-nats-streaming'
import { Listener } from './base-listener'
import { TicketCreatedEvent } from './ticket-created-event'
import { Subjects } from './subjects'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
  queueGropName = 'payments-service'

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data)

    console.log('data.id', data.id)
    console.log('data.title', data.title)
    console.log('data.price', data.price)

    msg.ack()
  }
}
