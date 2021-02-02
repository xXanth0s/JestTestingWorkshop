import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockProvider } from 'ng-mocks';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user.type';
import { UserInputComponent } from '../user-input/user-input.component';

import { StartPageComponent } from './start-page.component';

describe('StartPageComponent', () => {
  let component: StartPageComponent;
  let fixture: ComponentFixture<StartPageComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StartPageComponent,
        MockComponent(UserInputComponent)
      ],
      providers: [
        MockProvider(UserService)
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setUser', () => {


    it('should call setUser Function in UserService', () => {
      const testUser: User = {
        name: 'Max',
        email: 'test@gmail.com'
      };
      const setUserSpy = jest.spyOn(userService, 'setUser');

      component.setUser(testUser);

      expect(setUserSpy).toHaveBeenCalledWith(testUser);
    });
  });
});
