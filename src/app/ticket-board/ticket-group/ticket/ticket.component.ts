import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ViewTicketDetails } from '../../actions/ticket-board.actions';
import { Ticket } from '../../models/ticket-board.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @Input() ticket: Ticket;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  viewDetails(): void {
    this.store.dispatch(new ViewTicketDetails(this.ticket.id));
  }
}
