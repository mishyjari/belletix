import { Publisher, Subjects, TicketUpdatedEvent } from "@mfrattaroli/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}