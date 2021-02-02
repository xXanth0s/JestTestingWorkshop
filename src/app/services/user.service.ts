import { Injectable } from '@angular/core';
import { User } from '../types/user.type';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private user: User;

    public setUser(user: User) {
        this.user = user;
    }

}
