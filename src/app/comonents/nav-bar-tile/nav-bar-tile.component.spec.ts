import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavBarTile } from 'src/app/types/nav-bar-tile.type';

import { NavBarTileComponent } from './nav-bar-tile.component';

describe('NavBarTileComponent', () => {
  let component: NavBarTileComponent;
  let fixture: ComponentFixture<NavBarTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarTileComponent ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClicked', () => {

    const tileData: NavBarTile = {
      isActive: false,
      route: 'test',
      title: 'tesTitle'
    };

    beforeEach(() => {
      component.tileData = tileData;
      fixture.detectChanges();
    });

    it('should emit tileClicked EventEmitter', done => {


      component.tileClicked.subscribe((result) => {
        expect(result).toBe(tileData);
        done();
      });

      component.onClicked();
    });

    it('should emit event, when button clicked', done => {
      component.tileClicked.subscribe((result) => {
        expect(result).toBe(tileData);
        done();
      });

      const button = fixture.debugElement.query(By.css('button'));

      button.nativeElement.click();
    });
  });
});
