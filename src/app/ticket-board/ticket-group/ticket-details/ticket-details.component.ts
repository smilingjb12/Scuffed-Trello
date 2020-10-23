import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LookupDataService } from 'src/app/lookup-data.service';
import { CloseTicketDetails, FetchTicketList, UpdateTicket } from '../../actions/ticket-board.actions';
import { AddComment, FetchComments } from '../../actions/ticket-comments.action';
import { Lookup, Ticket } from '../../models/ticket-board.model';
import { TicketComment } from '../../models/ticket-comments.model';
import { TicketBoardState } from '../../states/ticket-board.state';
import { TicketCommentsState } from '../../states/ticket-comments.state';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  @Select(TicketBoardState.getViewedTicket) viewedTicket$: Observable<Ticket>;
  @Select(TicketCommentsState.getTicketComments) ticketComments$: Observable<TicketComment[]>;
  form: FormGroup;
  newCommentForm: FormGroup;
  categories: Lookup[];

  constructor(
    private modalService: NgbModal,
    private store: Store,
    private fb: FormBuilder,
    private lookupDataService: LookupDataService) { }

  ngOnInit(): void {
    this.lookupDataService.getCategories()
      .subscribe(categories => this.categories = categories);

    this.newCommentForm = this.fb.group({
      text: ['', Validators.required]
    });

    this.viewedTicket$.subscribe(ticket => {
      this.form = this.createForm(ticket);
      if (ticket) {
        this.open(this.content);
        this.store.dispatch(new FetchComments(ticket.id));
      } else {
        this.modalService.dismissAll();
      }
    });
  }

  addComment(): void {
    const comment = (this.newCommentForm.value as TicketComment).text;
    this.store.dispatch(new AddComment(comment, this.getTicket().id));
    this.newCommentForm.reset();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.store.dispatch(new CloseTicketDetails());
    }, (reason) => {
      this.store.dispatch([
        new UpdateTicket(this.getTicket()),
        new CloseTicketDetails(),
        new FetchTicketList()
      ]);
    });
  }

  getTicket(): Ticket {
    return this.form.getRawValue();
  }

  createForm(ticket: Ticket): FormGroup {
    ticket = ticket ?? <Ticket>{};
    return this.fb.group({
      id: [ticket.id],
      title: [ticket.title, Validators.required],
      description: [ticket.description, Validators.required],
      categoryId: [ticket.categoryId, Validators.required]
    });
  }
}
