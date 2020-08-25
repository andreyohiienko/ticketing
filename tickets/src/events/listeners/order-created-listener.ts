import { Message } from 'node-nats-streaming'
import { Listener, OrderCreatedEvent, Subjects } from '@aotickets/common'
import { queueGroupName } from './queue-group-name'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
  queueGropName = queueGroupName

  onMessage(data: OrderCreatedEvent['data'], msg: Message) {}
}
