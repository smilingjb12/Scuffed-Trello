import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CATEGORIES } from '../constants';
import { FetchTicketList } from './actions/ticket-board.actions';
import { Ticket } from './models/ticket-board.model';
import { TicketBoardState } from './states/ticket-board.state';

@Component({
  selector: 'app-ticket-board',
  templateUrl: './ticket-board.component.html',
  styleUrls: ['./ticket-board.component.scss']
})
export class TicketBoardComponent implements OnInit {
  @Select(TicketBoardState.getTicketsByCategory(CATEGORIES.NEW))
  newTickets: Observable<Ticket[]>;
  @Select(TicketBoardState.getTicketsByCategory(CATEGORIES.IN_PROGRESS))
  inProgressTickets: Observable<Ticket[]>;
  @Select(TicketBoardState.getTicketsByCategory(CATEGORIES.DONE))
  doneTickets: Observable<Ticket[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new FetchTicketList());
  }

}
