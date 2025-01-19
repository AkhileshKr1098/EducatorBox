import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletPayComponent } from './wallet-pay.component';

describe('WalletPayComponent', () => {
  let component: WalletPayComponent;
  let fixture: ComponentFixture<WalletPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
