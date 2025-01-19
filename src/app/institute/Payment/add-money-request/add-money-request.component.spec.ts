import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoneyRequestComponent } from './add-money-request.component';

describe('AddMoneyRequestComponent', () => {
  let component: AddMoneyRequestComponent;
  let fixture: ComponentFixture<AddMoneyRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoneyRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMoneyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
