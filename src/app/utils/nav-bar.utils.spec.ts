import { getNavBarItemsFromString, isStartPage } from './nav-bar.utils';

describe('NavBarUtils', () => {

    xdescribe('isStartPage', () => {

        it('should return true, when given text is "home"', () => {
            // Given
            const inputParameter = 'home';

            // Then
            const result = isStartPage(inputParameter);

            // When
            expect(result).toBe(true);
        });

        it('should return false, when given text is not "home"', () => {
            const inputParameter = 'homes';

            const result = isStartPage(inputParameter);

            expect(result).toBe(false);
        });
    });

    describe('getNavBarItemsFromString', () => {
        it('should return right array', () => {
            const inputs = [ 'test', 'home' ];
            const expectedResult = [

                {
                    isActive: false,
                    route: `/${inputs[0]}`,
                    title: inputs[0]
                },
                {
                    isActive: true,
                    route: `/${inputs[1]}`,
                    title: inputs[1]
                },

            ];

            const result = getNavBarItemsFromString(inputs);

            expect(result).toEqual(expectedResult);
        });

        it('should return empty array for undefined input', () => {
            const result = getNavBarItemsFromString(undefined);

            expect(result).toEqual([]);
        });
    });
});
