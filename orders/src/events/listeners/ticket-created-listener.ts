import { Message } from 'node-nats-streaming'
import { Listener, TicketCreatedEvent, Subjects } from '@aotickets/common'
import { queueGroupName } from './queue-group-name'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
  queueGropName = queueGroupName

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {}
}
