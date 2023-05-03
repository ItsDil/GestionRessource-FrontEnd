import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererPanneTechComponent } from './gerer-panne-tech.component';

describe('GererPanneTechComponent', () => {
  let component: GererPanneTechComponent;
  let fixture: ComponentFixture<GererPanneTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererPanneTechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererPanneTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
