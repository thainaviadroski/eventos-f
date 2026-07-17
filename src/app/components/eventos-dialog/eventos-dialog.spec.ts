import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosDialog } from './eventos-dialog';

describe('EventosDialog', () => {
  let component: EventosDialog;
  let fixture: ComponentFixture<EventosDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventosDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
