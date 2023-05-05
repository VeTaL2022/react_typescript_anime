export interface IAnimeShortData {
    mal_id: number,
    images: {
        jpg: {
            image_url: string,
        }
    },
    title: string,
    type: string,
    episodes: number,
    score: number,
    scored_by: number,
    rank: number,
    members: number,
    favorites: number
}

export const most_popular_anime: IAnimeShortData[] = [
    {
        "mal_id": 16498,
        "images": {
            "jpg": {
                "image_url": "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
            },
        },
        "title": "Shingeki no Kyojin",
        "type": "TV",
        "episodes": 25,
        "score": 8.53,
        "scored_by": 2630279,
        "rank": 109,
        "members": 3699595,
        "favorites": 162050,
    },
    {
        "mal_id": 1535,
        "images": {
            "jpg": {
                "image_url": "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
            },
        },
        "title": "Death Note",
        "type": "TV",
        "episodes": 37,
        "score": 8.62,
        "scored_by": 2589776,
        "rank": 75,
        "members": 3669356,
        "favorites": 165924,
    },
    {
        "mal_id": 5114,
        "images": {
            "jpg": {
                "image_url": "https://cdn.myanimelist.net/images/anime/1208/94745.jpg",
            },
        },
        "title": "Fullmetal Alchemist: Brotherhood",
        "type": "TV",
        "episodes": 64,
        "score": 9.11,
        "scored_by": 1990225,
        "rank": 2,
        "members": 3130997,
        "favorites": 215382,
    },
    {
        "mal_id": 30276,
        "images": {
            "jpg": {
                "image_url": "https://cdn.myanimelist.net/images/anime/12/76049.jpg",
            },
        },
        "title": "One Punch Man",
        "type": "TV",
        "episodes": 12,
        "score": 8.5,
        "scored_by": 2106132,
        "rank": 126,
        "members": 3021379,
        "favorites": 61784,
    },
    {
        "mal_id": 11757,
        "images": {
            "jpg": {
                "image_url": "https://cdn.myanimelist.net/images/anime/11/39717.jpg",
            },
        },
        "title": "Sword Art Online",
        "type": "TV",
        "episodes": 25,
        "score": 7.2,
        "scored_by": 2053705,
        "rank": 3112,
        "members": 2923913,
        "favorites": 66545,
    },
    {
        "mal_id": 31964,
        "images": {
            "jpg": {
                "image_url": "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
            },
        },
        "title": "Boku no Hero Academia",
        "type": "TV",
        "episodes": 13,
        "score": 7.9,
        "scored_by": 1955992,
        "rank": 734,
        "members": 2849194,
        "favorites": 53131,
    },
    {
        "mal_id": 38000,
        "images": {
            "jpg": {
                "image_url": "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
            },
        },
        "title": "Kimetsu no Yaiba",
        "type": "TV",
        "episodes": 26,
        "score": 8.51,
        "scored_by": 1908468,
        "rank": 124,
        "members": 2759299,
        "favorites": 87057,
    },
    {
        "mal_id": 20,
        "images": {
            "jpg": {
                "image_url": "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
            },
        },
        "title": "Naruto",
        "type": "TV",
        "episodes": 220,
        "score": 7.98,
        "scored_by": 1865096,
        "rank": 623,
        "members": 2689757,
        "favorites": 75570,
    },
    {
        "mal_id": 22319,
        "images": {
            "jpg": {
                "image_url": "https://cdn.myanimelist.net/images/anime/1498/134443.jpg",
            },
        },
        "title": "Tokyo Ghoul",
        "type": "TV",
        "episodes": 12,
        "score": 7.79,
        "scored_by": 1775586,
        "rank": 966,
        "members": 2674870,
        "favorites": 48807,
    },
    {
        "mal_id": 11061,
        "images": {
            "jpg": {
                "image_url": "https://cdn.myanimelist.net/images/anime/1337/99013.jpg",
            },
        },
        "title": "Hunter x Hunter (2011)",
        "type": "TV",
        "episodes": 148,
        "score": 9.04,
        "scored_by": 1630482,
        "rank": 11,
        "members": 2622999,
        "favorites": 198115,
    },
    {
        "mal_id": 32281,
        "images": {
            "jpg": {
                "image_url": "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
            },
        },
        "title": "Kimi no Na wa.",
        "type": "Movie",
        "episodes": 1,
        "score": 8.85,
        "scored_by": 1785299,
        "rank": 28,
        "members": 2565360,
        "favorites": 86429,
    },
    {
        "mal_id": 25777,
        "images": {
            "jpg": {
                "image_url": "https://cdn.myanimelist.net/images/anime/4/84177.jpg",
            },
        },
        "title": "Shingeki no Kyojin Season 2",
        "type": "TV",
        "episodes": 12,
        "score": 8.5,
        "scored_by": 1740356,
        "rank": 130,
        "members": 2536599,
        "favorites": 20722,
    },
    {
        "mal_id": 9253,
        "images": {
            "jpg": {
                "image_url": "https://cdn.myanimelist.net/images/anime/1935/127974.jpg",
            },
        },
        "title": "Steins;Gate",
        "type": "TV",
        "episodes": 24,
        "score": 9.08,
        "scored_by": 1322243,
        "rank": 4,
        "members": 2412782,
        "favorites": 181328,
    },
    {
        "mal_id": 33486,
        "images": {
            "jpg": {
                "image_url": "https://cdn.myanimelist.net/images/anime/12/85221.jpg",
            },
        },
        "title": "Boku no Hero Academia 2nd Season",
        "type": "TV",
        "episodes": 25,
        "score": 8.12,
        "scored_by": 1639403,
        "rank": 438,
        "members": 2387708,
        "favorites": 17149,
    },
];


