import { Publisher, TicketUpdatedEvent, Subjects } from '@aotickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated // same as subject: Subjects.TicketUpdated = Subjects.TickeUpdatedt
}
