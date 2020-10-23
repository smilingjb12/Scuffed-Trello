import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket-board.model';

@Component({
  selector: 'app-ticket-group',
  templateUrl: './ticket-group.component.html',
  styleUrls: ['./ticket-group.component.scss']
})
export class TicketGroupComponent implements OnInit {
  @Input() tickets: Observable<Ticket[]>;
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
