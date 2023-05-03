import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalePanneComponent } from './signale-panne.component';

describe('SignalePanneComponent', () => {
  let component: SignalePanneComponent;
  let fixture: ComponentFixture<SignalePanneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignalePanneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalePanneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
