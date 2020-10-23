import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketGroupComponent } from './ticket-group.component';

describe('TicketGroupComponent', () => {
  let component: TicketGroupComponent;
  let fixture: ComponentFixture<TicketGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
