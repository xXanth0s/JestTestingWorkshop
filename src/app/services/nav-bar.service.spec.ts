import { TestBed } from '@angular/core/testing';

import { NavBarService } from './nav-bar.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NavBarTile } from '../types/nav-bar-tile.type';

describe('NavBarService', () => {
    let service: NavBarService;
    let httpClientMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ]
        });
        service = TestBed.inject(NavBarService);
        httpClientMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getNavBarItems', () => {

        it('should return a nice array with strings', done => {
            const expectedData = [ 'test' ];
            service.getNavBarItems().subscribe(result => {
                expect(result).toEqual(expectedData);
                done();
            });

            const req = httpClientMock.expectOne('navbar');
            expect(req.request.method).toBe('GET');
            req.flush(expectedData);
        });

        it('should return a empty array, when httpClient returns null', done => {
            service.getNavBarItems().subscribe(result => {
                expect(result).toEqual([]);
                done();
            });

            const req = httpClientMock.expectOne('navbar');
            expect(req.request.method).toBe('GET');
            req.flush(null);
        });
    });

    describe('setNavBarItemActive', () => {

        it('should return true, when no error occurred', done => {
            const itemTitle: NavBarTile = {
                title: 'test',
                isActive: false,
                route: '/test'
            };

            service.setNavBarItemActive(itemTitle).subscribe(result => {
                expect(result).toEqual(true);
                done();
            });

            const req = httpClientMock.expectOne('navbar/setActive');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual({ itemTitle });
            req.flush({});
        });

        it('should return false, when error occurred', done => {
            const itemTitle: NavBarTile = {
                title: 'test',
                isActive: false,
                route: '/test'
            };

            service.setNavBarItemActive(itemTitle).subscribe(result => {
                expect(result).toEqual(false);
                done();
            });

            const req = httpClientMock.expectOne('navbar/setActive');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual({ itemTitle });
            req.error({} as ErrorEvent);
        });
    });
});
