import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreFourComponent } from './offre-four.component';

describe('OffreFourComponent', () => {
  let component: OffreFourComponent;
  let fixture: ComponentFixture<OffreFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreFourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
