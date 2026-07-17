import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoDialog } from './certificado-dialog';

describe('CertificadoDialog', () => {
  let component: CertificadoDialog;
  let fixture: ComponentFixture<CertificadoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificadoDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
