import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelOffreCompleteComponent } from './appel-offre-complete.component';

describe('AppelOffreCompleteComponent', () => {
  let component: AppelOffreCompleteComponent;
  let fixture: ComponentFixture<AppelOffreCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppelOffreCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppelOffreCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
