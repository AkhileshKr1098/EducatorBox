import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateLoginComponent } from './certificate-login.component';

describe('CertificateLoginComponent', () => {
  let component: CertificateLoginComponent;
  let fixture: ComponentFixture<CertificateLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
