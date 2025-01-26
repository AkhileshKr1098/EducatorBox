import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletReportChildComponent } from './wallet-report-child.component';

describe('WalletReportChildComponent', () => {
  let component: WalletReportChildComponent;
  let fixture: ComponentFixture<WalletReportChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletReportChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletReportChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
