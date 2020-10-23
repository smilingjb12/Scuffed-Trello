import { CATEGORIES } from './constants';
import { Ticket } from './ticket-board/models/ticket-board.model';
import { TicketComment } from './ticket-board/models/ticket-comments.model';

export const DATABASE = {
  TICKETS: [
    { id: 1, title: 'One', description: 'desc', categoryId: CATEGORIES.NEW }
  ] as Ticket[],
  TICKET_COMMENTS: [] as TicketComment[]
}

