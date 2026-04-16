import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosDetails } from './eventos-details';

describe('EventosDetails', () => {
  let component: EventosDetails;
  let fixture: ComponentFixture<EventosDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventosDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
