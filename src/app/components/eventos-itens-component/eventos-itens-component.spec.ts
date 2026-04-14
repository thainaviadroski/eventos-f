import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosItensComponent } from './eventos-itens-component';

describe('EventosItensComponent', () => {
  let component: EventosItensComponent;
  let fixture: ComponentFixture<EventosItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventosItensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
