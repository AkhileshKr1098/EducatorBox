import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTransactionPresentInstComponent } from './payment-transaction-present-inst.component';

describe('PaymentTransactionPresentInstComponent', () => {
  let component: PaymentTransactionPresentInstComponent;
  let fixture: ComponentFixture<PaymentTransactionPresentInstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTransactionPresentInstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTransactionPresentInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
