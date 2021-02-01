import { Component, Input } from '@angular/core';
import { NavBarTile } from '../../types/nav-bar-tile.type';

@Component({
    selector: 'app-nav-bar-tile',
    templateUrl: './nav-bar-tile.component.html',
    styleUrls: [ './nav-bar-tile.component.scss' ]
})
export class NavBarTileComponent {

    @Input()
    public tileData: NavBarTile;

    constructor() {
    }

}
