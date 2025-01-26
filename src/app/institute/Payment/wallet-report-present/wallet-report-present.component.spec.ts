import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletReportPresentComponent } from './wallet-report-present.component';

describe('WalletReportPresentComponent', () => {
  let component: WalletReportPresentComponent;
  let fixture: ComponentFixture<WalletReportPresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletReportPresentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletReportPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
