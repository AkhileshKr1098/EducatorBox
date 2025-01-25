import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoneyDirectComponent } from './add-money-direct.component';

describe('AddMoneyDirectComponent', () => {
  let component: AddMoneyDirectComponent;
  let fixture: ComponentFixture<AddMoneyDirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoneyDirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMoneyDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
