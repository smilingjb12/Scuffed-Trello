import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { CATEGORIES } from './constants';
import { Ticket } from './ticket-board/models/ticket-board.model';
import { TicketBoardState } from './ticket-board/states/ticket-board.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {

  }
}
