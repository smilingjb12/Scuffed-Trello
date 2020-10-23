export class FetchComments {
  static readonly type = '[TicketComment] Fetch all';
  constructor(public ticketId: number) { }
}

export class AddComment {
  static readonly type = '[TicketComment] Add';
  constructor(public comment: string, public ticketId: number) { }
}
