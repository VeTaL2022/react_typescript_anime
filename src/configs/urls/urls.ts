const AnimeAPI_URL = import.meta.env.VITE_ANIME_API_URL;
const NewsAPI_URL = import.meta.env.VITE_NEWS_API_URL;
const RapidAPI_News_URL = import.meta.env.VITE_RAPID_API_NEWS;
const QuoteAPI_URL = import.meta.env.VITE_QUOTE_API_URL;
const ImageAPI_URL = import.meta.env.VITE_IMAGE_API_URL;

const urls = {
    anime: '/anime', // all anime
    top_anime: '/top/anime', // top anime
    seasons: '/seasons', // anime by season
    genres: '/genres/anime', // genres
    recommendations: '/recommendations', // recommendations
    reviews: '/reviews/anime', // recent reviews
    producers: '/producers', // all studios
    characters: '/characters', // anime characters
    people: '/people', // people
    search: '/search', // news
    quotes: '/quotes', // quotes
    random: '/random', // random quotes
    single: '/sfw', // single image
    many: '/many/sfw', // many images
}

export {AnimeAPI_URL, NewsAPI_URL, RapidAPI_News_URL, QuoteAPI_URL, ImageAPI_URL, urls}
