export function mockService<T>(constructor: new (...args: any[]) => T): jest.Mocked<T> {
    return getSpyObj<T>(constructor);
}

function getSpyObj<T>(constructor: new (...args: any[]) => T, spyObject?: jest.Mocked<T>): jest.Mocked<T> {
    const prototype = constructor.prototype;

    const spyObj = spyObject || {} as jest.Mocked<T>;
    Object.keys(prototype).forEach(property => {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, property);
        if (descriptor === undefined) {
            return;
        }
        if (isSpy(descriptor)) {
            spyObj[property] = prototype[property];
        } else if (descriptor.value !== undefined) {
            const spy = jest.spyOn(prototype, property);
            spy.mockReturnValue(undefined);
            spyObj[property] = spy;
        } else if (descriptor.get !== undefined) {
            spyObj[property] = jest.spyOn(prototype, property, 'get');
        }
    });
    const inheritance = Object.getPrototypeOf(constructor);
    if (inheritance.prototype && Object.keys(inheritance.prototype).length !== 0) {
        return getSpyObj(inheritance, spyObj);
    }
    return spyObj;
}

function isSpy(descriptor: PropertyDescriptor): boolean {
    if (descriptor.value === undefined) {
        return false;
    }
    const spyFields = [ 'and', 'calls' ];
    const missingField = spyFields
        .find(spyField => Object.getOwnPropertyDescriptor(descriptor.value, spyField) === undefined);
    return missingField === undefined;
}
