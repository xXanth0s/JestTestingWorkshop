import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  constructor(private readonly http: HttpClient) {
  }

  public getNavBarItems(): Observable<string[]> {
    return this.http.get<string[]>('').pipe(
        map(navItems => navItems || [])
    );
  }

}
