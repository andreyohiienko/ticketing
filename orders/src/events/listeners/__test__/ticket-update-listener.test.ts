import { Message } from 'node-nats-streaming'
import mongoose from 'mongoose'
import { TicketUpdatedListener } from '../ticket-updated-listener'
import { natsWrapper } from '../../../nats-wrapper'
import { Ticket } from '../../../models/ticket'
import { TicketUpdatedEvent } from '@aotickets/common'

const setup = async () => {
  // Create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client)

  // Create and save a ticket
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  })
  await ticket.save()

  // Create a fake data object
  const data: TicketUpdatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: ticket.version + 1,
    title: 'new concert',
    price: 999,
    userId: 'asdkasdk',
  }

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  }

  // return all of this stuff

  return { msg, data, ticket, listener }
}

it('should find, update and save a ticket', async () => {})

it('should ack the message', async () => {})
