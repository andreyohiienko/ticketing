import { Publisher, TicketCreatedEvent, Subjects } from '@aotickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated // same as subject: Subjects.TicketCreated = Subjects.TicketCreated
}
