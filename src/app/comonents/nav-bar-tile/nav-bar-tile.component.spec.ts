import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarTileComponent } from './nav-bar-tile.component';

xdescribe('NavBarTileComponent', () => {
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
});
