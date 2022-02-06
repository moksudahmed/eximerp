import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOfAccountEditComponent } from './chart-of-account-edit.component';

describe('ChartOfAccountEditComponent', () => {
  let component: ChartOfAccountEditComponent;
  let fixture: ComponentFixture<ChartOfAccountEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartOfAccountEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartOfAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
