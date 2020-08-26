import { Message } from 'node-nats-streaming'
import {
  Listener,
  ExpirationCompleteEvent,
  Subjects,
  OrderStatus,
} from '@aotickets/common'
import { queueGroupName } from './queue-group-name'
import { Order } from '../../models/order'

export class ExpirationCompleteListener extends Listener<
  ExpirationCompleteEvent
> {
  readonly subject = Subjects.ExpirationComplete
  queueGropName = queueGroupName

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    order.set({
      status: OrderStatus.Cancelled,
      ticket: null,
    })
  }
}
