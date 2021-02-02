import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { User } from 'src/app/types/user.type';

import { UserInputComponent } from './user-input.component';

describe('UserInputComponent', () => {
  let component: UserInputComponent;
  let fixture: ComponentFixture<UserInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserInputComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {

    it('should be invalid, when mail and name are missing', () => {

      component.form.controls.email.setValue('');
      component.form.controls.name.setValue('');

      expect(component.form.valid).toBe(false);
    });

    it('should be invalid, when  name is missing', () => {

      component.form.controls.email.setValue('test@gmail.com');
      component.form.controls.name.setValue('');

      expect(component.form.valid).toBe(false);
    });

    it('should be invalid, when mail is missing', () => {

      component.form.controls.email.setValue('');
      component.form.controls.name.setValue('test');

      expect(component.form.valid).toBe(false);
    });

    it('should be invalid, when mail is not a email', () => {

      component.form.controls.email.setValue('ttt');
      component.form.controls.name.setValue('ttt');

      expect(component.form.valid).toBe(false);
    });

    it('should be valid, when name is given and mail is a valid email', () => {

      component.form.controls.email.setValue('test@gmail.com');
      component.form.controls.name.setValue('ttt');

      expect(component.form.valid).toBe(true);
    });

  });

  describe('submitForm', () => {

    const userData: User = {
      email: 'test@gmail.com',
      name: 'Max'
    };

    beforeEach(() => {
      component.form.controls.email.setValue(userData.email);
      component.form.controls.name.setValue(userData.name);

      fixture.detectChanges();
    });

    it('should dispatch form data', done => {
      component.formSubmitted.subscribe(result => {
        expect(result).toEqual(userData);
        done();
      });

      component.submitForm();
    });

    it('should submit form, when clicking submit button', done => {
      component.formSubmitted.subscribe(result => {
        expect(result).toEqual(userData);
        done();
      });

      const button = fixture.debugElement.query(By.css('button'));

      button.nativeElement.click();
    });
  });
});
