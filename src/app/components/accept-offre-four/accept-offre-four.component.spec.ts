import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptOffreFourComponent } from './accept-offre-four.component';

describe('AcceptOffreFourComponent', () => {
  let component: AcceptOffreFourComponent;
  let fixture: ComponentFixture<AcceptOffreFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptOffreFourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptOffreFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
