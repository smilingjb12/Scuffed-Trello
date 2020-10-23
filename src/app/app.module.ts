import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TicketBoardComponent } from './ticket-board/ticket-board.component';
import { TicketBoardState } from './ticket-board/states/ticket-board.state';
import { TicketDetailsComponent } from './ticket-board/ticket-group/ticket-details/ticket-details.component';
import { TicketFormComponent } from './ticket-board/ticket-group/ticket-form/ticket-form.component';
import { TicketComponent } from './ticket-board/ticket-group/ticket/ticket.component';
import { TicketGroupComponent } from './ticket-board/ticket-group/ticket-group.component';
import { TicketCommentsState } from './ticket-board/states/ticket-comments.state';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    TicketFormComponent,
    TicketDetailsComponent,
    TicketBoardComponent,
    TicketGroupComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([
      TicketBoardState,
      TicketCommentsState
    ], {
      developmentMode: !environment.production
    }),
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
