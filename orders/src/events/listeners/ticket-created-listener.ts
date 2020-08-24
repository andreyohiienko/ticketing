import { Message } from 'node-nats-streaming'
import { Listener, TicketCreatedEvent, Subjects } from '@aotickets/common'
import { queueGroupName } from './queue-group-name'
import { Ticket } from '../../models/ticket'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
  queueGropName = queueGroupName

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { title, price } = data

    const ticket = Ticket.build({
      title,
      price,
    })
    await ticket.save()

    msg.ack()
  }
}
