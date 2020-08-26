import { Publisher, Subjects, ExpirationCompleteEvent } from '@aotickets/common'

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  readonly subject = Subjects.ExpirationComplete
}
