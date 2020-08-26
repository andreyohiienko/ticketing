import { Listener, OrderCreatedEvent, Subjects } from '@aotickets/common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
  queueGropName = queueGroupName

  onMessage(data: OrderCreatedEvent['data'], msg: Message) {}
}
