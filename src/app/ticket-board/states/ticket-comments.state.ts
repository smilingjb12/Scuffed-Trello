import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { tap } from 'rxjs/operators';
import { AddComment, FetchComments } from '../actions/ticket-comments.action';
import { TicketComment } from '../models/ticket-comments.model';
import { TicketDataService } from '../ticket-data.service';
import { orderBy } from 'lodash';

export class TicketCommentsStateModel {
  comments: TicketComment[];
}

@State<TicketCommentsStateModel>({
  name: 'ticketComments',
  defaults: {
    comments: []
  }
})
@Injectable()
export class TicketCommentsState {
  constructor(private ticketDataService: TicketDataService) {
  }

  @Selector()
  static getTicketComments(state: TicketCommentsStateModel): TicketComment[] {
    return orderBy(state.comments, c => c.id, 'desc');
  }

  @Action(FetchComments)
  fetchTicketComments(context: StateContext<TicketCommentsStateModel>, action: FetchComments) {
    return this.ticketDataService.fetchComments(action.ticketId).pipe(tap(comments => {
      const newState = produce(context.getState(), draft => {
        draft.comments = comments;
      });
      context.setState(newState);
    }));
  }

  @Action(AddComment)
  addComment(context: StateContext<TicketCommentsStateModel>, action: AddComment) {
    return this.ticketDataService.addComment(action.comment, action.ticketId).pipe(tap((comment) => {
      const newState = produce(context.getState(), draft => {
        draft.comments.push(comment);
      });
      context.setState(newState);
    }));
  }
}