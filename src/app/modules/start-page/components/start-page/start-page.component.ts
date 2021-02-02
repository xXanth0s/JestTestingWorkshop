import { Component } from '@angular/core';
import { User } from '../../../../types/user.type';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-start-page',
    templateUrl: './start-page.component.html',
    styleUrls: [ './start-page.component.scss' ]
})
export class StartPageComponent {

    constructor(private readonly userService: UserService) {
    }

    public setUser(user: User): void {
        this.userService.setUser(user);
    }
}
