import { Ticket } from '../models/ticket-board.model';

export class FetchTicketList {
  static readonly type = '[Ticket] fetch all';
  constructor() { }
}

export class AddTicket {
  static readonly type = '[Ticket] Add';
  constructor(public payload: Ticket) { }
}

export class ViewTicketDetails {
  static readonly type = '[Ticket] View details';
  constructor(public id: number) { }
}

export class CloseTicketDetails {
  static readonly type = '[Ticket] Close details';
  constructor() { }
}

export class UpdateTicket {
  static readonly type = '[Ticket] update';
  constructor(public payload: Ticket) { }
}