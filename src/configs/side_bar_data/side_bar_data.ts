import {
    Category,
    FormatQuote,
    Home,
    Image,
    Newspaper,
    Recommend, Reviews,
    Search,
    Shuffle,
    Topic,
    ViewArray
} from "@mui/icons-material";

import {INavItem} from "../../interfaces";

export const side_bar_items: INavItem[] = [
    {
        title: 'Home',
        path: 'home',
        icon: Home,
        cName: 'nav-text'
    },
    {
        title: 'Anime',
        path: 'anime',
        icon: ViewArray,
        cName: 'nav-text',
        children: [
            {
                title: 'Top',
                path: 'anime/top',
                icon: Topic,
                cName: 'nav-text'
            },
            {
                title: 'Recs',
                path: 'anime/recommendations',
                icon: Recommend,
                cName: 'nav-text',
            },
            {
                title: 'Search',
                path: 'anime',
                icon: Search,
                cName: 'nav-text'
            },
            {
                title: 'Reviews',
                path: 'anime/reviews',
                icon: Reviews,
                cName: 'nav-text'
            },
        ]
    },
    {
        title: 'Images',
        path: 'images',
        icon: Image,
        cName: 'nav-text',
        children: [
            {
                title: 'Random',
                path: 'images',
                icon: Shuffle,
                cName: 'nav-text'
            },
            {
                title: 'Category',
                path: 'images/category',
                icon: Category,
                cName: 'nav-text'
            }
        ]
    },
    {
        title: 'Quotes',
        path: 'quotes',
        icon: FormatQuote,
        cName: 'nav-text'
    },
    {
        title: 'News',
        path: 'news',
        icon: Newspaper,
        cName: 'nav-text'
    },
];
