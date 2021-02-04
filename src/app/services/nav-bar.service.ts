import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, mapTo } from 'rxjs/operators';
import { NavBarTile } from '../types/nav-bar-tile.type';

@Injectable({
    providedIn: 'root'
})
export class NavBarService {

    private readonly baseUrl = 'navbar';

    constructor(private readonly http: HttpClient) {
    }

    public getNavBarItems(): Observable<string[]> {
        return this.http.get<string[]>(this.baseUrl).pipe(
            map(navItems => navItems || [])
        );
    }

    public setNavBarItemActive(itemTitle: NavBarTile): Observable<boolean> {
        return this.http.post<void>(`${this.baseUrl}/setActive`, { itemTitle }).pipe(
            mapTo(true),
            catchError(() => of(false)),
        );
    }
}
