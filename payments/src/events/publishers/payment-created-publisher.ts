import { PaymentCreatedEvent, Publisher, Subjects } from '@aotickets/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated
}
