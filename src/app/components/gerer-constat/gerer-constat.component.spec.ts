import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererConstatComponent } from './gerer-constat.component';

describe('GererConstatComponent', () => {
  let component: GererConstatComponent;
  let fixture: ComponentFixture<GererConstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererConstatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererConstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
