import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockProvider } from 'ng-mocks';
import { Subject } from 'rxjs';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { NavBarTileComponent } from '../nav-bar-tile/nav-bar-tile.component';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  const getNavBarItemsSub$ = new Subject<string[]>();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavBarComponent,
        MockComponent(NavBarTileComponent)
      ],
      providers: [
        MockProvider(NavBarService, {
          getNavBarItems: () => getNavBarItemsSub$.asObservable()
        })
      ],
      imports: [
        RouterTestingModule
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('ngOnInit', () => {
    it('should set NavItems correctly', () => {
      const expectedResult = [
        {
          isActive: false,
          route: '/test',
          title: 'test',
        }
      ];
      component.ngOnInit();

      getNavBarItemsSub$.next([ 'test' ]);

      expect(component.navItems).toEqual(expectedResult);
    });
  });
});
