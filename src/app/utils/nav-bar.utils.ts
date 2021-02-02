import { NavBarTile } from '../types/nav-bar-tile.type';

const START_PAGE = 'home';

export const getNavBarItemsFromString = (items: string[] = []): NavBarTile[] => items.map(mapStringToNavBarTile);

function mapStringToNavBarTile(itemTitle: string): NavBarTile {
    return {
        isActive: isStartPage(itemTitle),
        route: `/${itemTitle}`,
        title: itemTitle
    };
}

export function isStartPage(itemTitle: string): boolean {
    return itemTitle === START_PAGE;
}
