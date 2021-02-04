import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../services/nav-bar.service';
import { NavBarTile } from '../../types/nav-bar-tile.type';
import { filter, map } from 'rxjs/operators';
import { getNavBarItemsFromString } from '../../utils/nav-bar.utils';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: [ './nav-bar.component.scss' ]
})
export class NavBarComponent implements OnInit {

    public navItems: NavBarTile[] = [];

    constructor(private readonly navBarService: NavBarService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        this.navBarService.getNavBarItems().pipe(
            map(data => getNavBarItemsFromString(data))
        ).subscribe(navItems => this.navItems = navItems);
    }

    public setRouteActive(navBarItem: NavBarTile): void {
        console.log(navBarItem);
        if (!navBarItem.isActive) {
            this.navBarService.setNavBarItemActive(navBarItem).pipe(
                filter(Boolean)
            ).subscribe(async () => {
                this.setNavBarItemActive(navBarItem);
                await this.router.navigateByUrl(navBarItem.route);
            });
        }
    }

    private setNavBarItemActive(navBarItem: NavBarTile): void {
        console.log(this.navItems);
        this.navItems.forEach(item => item.isActive = item.title === navBarItem.title);
    }
}
