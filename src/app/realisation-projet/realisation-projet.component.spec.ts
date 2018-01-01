import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisationProjetComponent } from './realisation-projet.component';

describe('RealisationProjetComponent', () => {
  let component: RealisationProjetComponent;
  let fixture: ComponentFixture<RealisationProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealisationProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealisationProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
