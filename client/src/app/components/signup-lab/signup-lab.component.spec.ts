import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupLabComponent } from './signup-lab.component';


describe('SignupLabComponent', () => {
  let component: SignupLabComponent;
  let fixture: ComponentFixture<SignupLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
