import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@grstickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
