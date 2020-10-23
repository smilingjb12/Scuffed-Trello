import { Injectable } from '@angular/core';
import produce from 'immer';
import { title } from 'process';
import { Observable, of } from 'rxjs';
import { CATEGORIES } from '../constants';
import { DATABASE } from '../database';
import { Ticket } from './models/ticket-board.model';
import { TicketComment } from './models/ticket-comments.model';
import { sortBy } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TicketDataService {
  public fetchTicketList(): Observable<Ticket[]> {
    console.log('fetchTicketList');
    return of(sortBy(DATABASE.TICKETS, 'id'));
  }

  public addComment(text: string, ticketId: number): Observable<TicketComment> {
    const comment = {
      id: DATABASE.TICKET_COMMENTS.length + 1,
      ticketId,
      text,
      user: 'Jack Jackson'
    };
    DATABASE.TICKET_COMMENTS.push(comment);
    return of(comment);
  }

  public fetchTicket(id: number): Observable<Ticket> {
    console.log('fetchTicket');
    const ticket = DATABASE.TICKETS.find(t => t.id === id);
    return of(ticket);
  }

  public fetchComments(ticketId: number): Observable<TicketComment[]> {
    console.log('fetchComments');
    const comments = DATABASE.TICKET_COMMENTS.filter(c => c.ticketId === ticketId);
    return of(comments);
  }

  public addTicket(ticket: Ticket): Observable<Ticket> {
    console.log('addTicket');
    const newTicket = produce(ticket, draft => {
      draft.id = parseInt(Math.random() * 10000000000 as any);
      draft.categoryId = CATEGORIES.NEW;
    });
    DATABASE.TICKETS = produce(DATABASE.TICKETS, draft => {
      draft.push(newTicket);
    });
    return of(newTicket);
  }

  public updateTicket(ticket: Ticket): Observable<Ticket> {
    console.log('updateTicket');
    const newTicket = produce(ticket, draft => {
      Object.assign(draft, ticket);
    });
    const newTickets = produce(DATABASE.TICKETS, draft => {
      const index = DATABASE.TICKETS.findIndex(t => t.id === ticket.id);
      draft.splice(index, 1);
      draft.push(newTicket);
    });
    DATABASE.TICKETS = newTickets;
    return of(newTicket);
  }

  constructor() { }
}
