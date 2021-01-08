import { Publisher, Subjects, TicketCreatedEvent } from "@mfrattaroli/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}