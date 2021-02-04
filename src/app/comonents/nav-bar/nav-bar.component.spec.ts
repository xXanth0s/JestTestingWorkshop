import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockProvider } from 'ng-mocks';
import { Subject } from 'rxjs';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { NavBarTileComponent } from '../nav-bar-tile/nav-bar-tile.component';
import * as navBarUtils from '../../utils/nav-bar.utils';

import { NavBarComponent } from './nav-bar.component';
import { Router } from '@angular/router';
import { NavBarTile } from 'src/app/types/nav-bar-tile.type';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let navBarService: NavBarService;
  let router: Router;

  const getNavBarItemsSub$ = new Subject<string[]>();
  const setNavBarItemActiveSub$ = new Subject<boolean>();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavBarComponent,
        MockComponent(NavBarTileComponent)
      ],
      providers: [
        MockProvider(NavBarService, {
          getNavBarItems: () => getNavBarItemsSub$.asObservable(),
          setNavBarItemActive: () => setNavBarItemActiveSub$.asObservable()
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

    navBarService = TestBed.inject(NavBarService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('ngOnInit', () => {

    let getNavBarItemsFromStringSpy: jest.SpyInstance;

    beforeEach(() => {
      getNavBarItemsFromStringSpy = jest.spyOn(navBarUtils, 'getNavBarItemsFromString');
    });

    it('should set NavItems correctly', () => {
      const testResult = [
        {
          isActive: false,
          route: '/testResult',
          title: 'Result',
        }
      ];
      const navBarStrings = [ 'test' ];
      getNavBarItemsFromStringSpy.mockReturnValue(testResult);


      component.ngOnInit();

      getNavBarItemsSub$.next(navBarStrings);

      expect(component.navItems).toEqual(testResult);
      expect(getNavBarItemsFromStringSpy).toHaveBeenCalledWith(navBarStrings);
    });
  });

  describe('setRouteActive', () => {

    let setNavBarItemActiveSpy: jest.SpyInstance;
    let routerSpy: jest.SpyInstance;
    let navItem: NavBarTile;

    beforeEach(() => {
      setNavBarItemActiveSpy = jest.spyOn(navBarService, 'setNavBarItemActive');
      routerSpy = jest.spyOn(router, 'navigateByUrl');

      navItem = {
        isActive: false,
        route: '/test',
        title: 'test'
      };
    });

    it('should not call service, when navItem is already active', () => {
      navItem.isActive = true;

      component.setRouteActive(navItem);

      expect(setNavBarItemActiveSpy).not.toHaveBeenCalled();
    });

    it('should not call service, when navItem is not active', () => {
      component.setRouteActive(navItem);

      expect(setNavBarItemActiveSpy).toHaveBeenCalledWith(navItem);
    });

    it('should not call router, when service returns false', () => {
      component.setRouteActive(navItem);

      setNavBarItemActiveSub$.next(false);

      expect(routerSpy).not.toHaveBeenCalled();
    });

    it('should call router, when service returns false', () => {
      component.setRouteActive(navItem);

      setNavBarItemActiveSub$.next(true);

      expect(routerSpy).toHaveBeenCalled();
    });

    it('should unactivate all NavItems and activate passed item', () => {

      component.navItems = [
        {
          isActive: true,
          route: '/home',
          title: 'home'
        },
        {
          isActive: false,
          route: '/superLink',
          title: 'superLink'
        },
        navItem
      ];

      component.setRouteActive(navItem);

      setNavBarItemActiveSub$.next(true);

      expect(component.navItems[0].isActive).toBe(false);
      expect(component.navItems[1].isActive).toBe(false);
      expect(component.navItems[2].isActive).toBe(true);
    });
  });
});
