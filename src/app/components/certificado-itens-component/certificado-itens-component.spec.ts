import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoItensComponent } from './certificado-itens-component';

describe('CertificadoItensComponent', () => {
  let component: CertificadoItensComponent;
  let fixture: ComponentFixture<CertificadoItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificadoItensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadoItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
