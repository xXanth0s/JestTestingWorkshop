import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../services/nav-bar.service';
import { NavBarTile } from '../../types/nav-bar-tile.type';
import { first, map } from 'rxjs/operators';
import { getNavBarItemsFromString } from '../../utils/nav-bar.utils';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: [ './nav-bar.component.scss' ]
})
export class NavBarComponent implements OnInit {

    public navItems: NavBarTile[] = [];

    constructor(private readonly navBarService: NavBarService) {
    }

    ngOnInit(): void {
        this.navBarService.getNavBarItems().pipe(
            first(),
            map(getNavBarItemsFromString)
        ).subscribe(navItems => this.navItems = navItems);
    }

}
