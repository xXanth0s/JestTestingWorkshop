## 6 HTTP-Client Testing

- Add dependencies for `nav-bar.service.ts` with mocks and `HttpClientTestingModule`
- store `HttpTestingController`
- expect url request via `expectOne`
- check HTTP Method
- flush data

Example:

```typescript
  it('should return an Observable<User[]>', () => {
    const dummyUsers = [
        { login: 'John' },
        { login: 'Doe' }
    ];

    service.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(`${service.API_URL}/users`);
    expect(req.request.method).toBe("GET");
    req.flush(dummyUsers);
});
```
