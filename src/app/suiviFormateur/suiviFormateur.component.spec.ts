import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SuiviFormateurComponent } from './suiviFormateur.component';


describe('SuiviFormateurComponent', () => {
  let component: SuiviFormateurComponent;
  let fixture: ComponentFixture<SuiviFormateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviFormateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
