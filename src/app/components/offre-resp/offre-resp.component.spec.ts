import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreRespComponent } from './offre-resp.component';

describe('OffreRespComponent', () => {
  let component: OffreRespComponent;
  let fixture: ComponentFixture<OffreRespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreRespComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreRespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
