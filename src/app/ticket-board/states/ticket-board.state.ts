import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket-board.model';
import { AddTicket, CloseTicketDetails, FetchTicketList as FetchTicketList, UpdateTicket, ViewTicketDetails } from '../actions/ticket-board.actions';
import produce from 'immer';
import { TicketDataService } from '../ticket-data.service';
import { CATEGORIES } from 'src/app/constants';
import { DRAFT_STATE } from 'immer/dist/internal';
import { sortBy } from 'lodash';

export class TicketBoardStateModel {
  tickets: Ticket[];
  viewedTicket: Ticket;
}

@State<TicketBoardStateModel>({
  name: 'tickets',
  defaults: {
    tickets: [],
    viewedTicket: null
  }
})
@Injectable()
export class TicketBoardState {
  constructor(private ticketDataService: TicketDataService) {
  }

  static getTicketsByCategory(categoryId: string) {
    return createSelector([TicketBoardState], (state: TicketBoardStateModel) => {
      return state.tickets.filter(t => t.categoryId === categoryId);
    });
  }

  @Selector()
  static getViewedTicket(state: TicketBoardStateModel): Ticket {
    return state.viewedTicket;
  }

  @Selector()
  static getTickets(state: TicketBoardStateModel): Ticket[] {
    return sortBy(state.tickets, t => t.id);
  }

  @Action(FetchTicketList)
  fetchTicketList(context: StateContext<TicketBoardStateModel>, action: FetchTicketList) {
    return this.ticketDataService.fetchTicketList().pipe(tap(tickets => {
      const newState = produce(context.getState(), draft => {
        draft.tickets = tickets;
      });
      context.setState(newState);
    }));
  }

  @Action(AddTicket)
  addTicket({ getState, setState }: StateContext<TicketBoardStateModel>, { payload }: AddTicket) {
    return this.ticketDataService.addTicket(payload).pipe(tap((result => {
      const newState = produce(getState(), draft => {
        draft.tickets.push(result);
      });
      setState(newState);
    })));
  }

  @Action(UpdateTicket)
  updateTicket({ getState, setState }: StateContext<TicketBoardStateModel>, { payload }: UpdateTicket) {
    return this.ticketDataService.updateTicket(payload).pipe(tap((result => {
      const state = getState();
      const newState = produce(state, draft => {
        const index = state.tickets.findIndex(t => t.id === result.id);
        draft.tickets.splice(index, 1);
        draft.tickets.push(result);
      });
      setState(newState);
    })));
  }

  @Action(CloseTicketDetails)
  closeTicketDetails(context: StateContext<TicketBoardStateModel>, action: CloseTicketDetails) {
    const newState = produce(context.getState(), draft => {
      draft.viewedTicket = null;
    });
    context.setState(newState);
  }

  @Action(ViewTicketDetails)
  viewTicketDetails(context: StateContext<TicketBoardStateModel>, action: ViewTicketDetails) {
    return this.ticketDataService.fetchTicket(action.id).pipe(tap((result => {
      const state = context.getState();
      const newState = produce(state, draft => {
        draft.viewedTicket = result;
      });
      context.setState(newState);
    })));
  }
}