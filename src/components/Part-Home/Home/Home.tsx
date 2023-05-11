import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Search} from "@mui/icons-material";
import Masonry from "react-masonry-css";

import {animeActions, imageActions, newsActions, quoteActions} from "../../../redux";
import {image_categories, most_popular_anime} from "../../../configs";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import imageNotFound from '../../../assets/ImageNotFound.png';
import {HomeReviews} from "../HomeReviews";
import {HomeAnimes} from "../HomeAnimes";
import {HomeRecs} from "../HomeRecs";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import {ToTop} from "../../ToTop";
import './Home.scss';

const randomCategory = image_categories[Math.floor(Math.random() * image_categories.length)];
export const Home: FC = () => {
    const {quote, loading, error, news, images, load, data, quotes} = useAppSelector((state) => ({
        quotes: state.quoteReducer.quotes,
        quote: state.quoteReducer.quote,
        loading: state.quoteReducer.loading,
        error: state.quoteReducer.error,
        news: state.newsReducer.news,
        images: state.imageReducer.image,
        load: state.imageReducer.loading,
        data: state.animeReducer.data,
    }));
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(quoteActions.getRandom());
        dispatch(quoteActions.getAllRandom());
        dispatch(animeActions.getTop({page: 1, filter: 'airing', limit: 14, type: ''}))
        dispatch(imageActions.getAllByCategory({category: randomCategory}));
        dispatch(newsActions.getAll({
            q: 'anime',
            sortBy: 'date',
            setLang: 'en',
            safeSearch: 'strict',
            count: 5,
            offset: 10,
        }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(quoteActions.reset());
        dispatch(newsActions.reset());
    }, [dispatch]);

    const articleURL = (url: string) => {
        return url.split('https://')?.pop()?.split('/')[0];
    };
    const breakColumns = {
        default: 3,
        1300: 2,
        1000: 1,
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchValue.length >= 3) {
            navigate(`/anime/search?name=${searchValue}`, {state: searchValue});
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }
    return (
        loading || load ? <Loader height={100}/> :
            <>
                <div className={'home'}>
                    <div className={'home-header'}>
                        <h4>
                            Welcome to AniXtra
                        </h4>
                        <form onSubmit={handleSubmit}>
                            <div style={{position: 'relative'}}>
                                <input
                                    type="text"
                                    placeholder={'Search Anime...'}
                                    value={searchValue}
                                    onChange={handleChange}
                                />
                                {searchValue.length >= 3 && (<Search/>)}
                            </div>
                        </form>
                    </div>
                    <div className={'quote-section'}>
                        <div className={'quote-slider'}>
                            {error.error ? (<div className={'quote-error'}>{error.error}</div>) : (
                                <Link to={'/quotes'} className={'quote'}>
                                    <cite>"{quote.quote.length < 130 ? quote.quote : quote.quote?.slice(0, 130) + '...'}"</cite>
                                    <span>{quote.character}</span>
                                </Link>
                            )}
                        </div>
                    </div>
                    <hr style={{width: '90%', border: '1px solid  #aeaaaa'}}/>
                    <div className={'image-info-section'}>
                        <div className={'left-side'}>
                            <p className={'fade-in'}>
                                Did you know that the word "anime" actually comes from the English word
                                "animation"?<br/><br/> Anime
                                is a unique art form that originated in Japan and has become a worldwide phenomenon.
                                With
                                its distinctive visual style, diverse storytelling, and engaging characters, anime has
                                captured the hearts of millions of fans around the globe. Whether you're a seasoned
                                otaku or
                                a newcomer to the world of anime, there's always something new and exciting to
                                discover. <br/><br/> So
                                why not sit back, relax, and immerse yourself in the wonderful world of anime? Who
                                knows,
                                you might just find your next favorite show!
                            </p>
                        </div>
                        <hr className={'hr'}/>
                        <div className={'right-side'}>
                            <p><Link
                                to={`/images/category/${randomCategory}`}>{randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1)} </Link>
                                (category)
                            </p>
                            <Masonry breakpointCols={breakColumns} className={'image-masonry-grid'}
                                     columnClassName={'image-masonry-grid_column'}>
                                {images.files.slice(0, 6).map((image, index) =>
                                    <Link
                                        to={`/images/category/${randomCategory}`}
                                        key={index}>
                                        <img src={image}
                                             alt={randomCategory}></img>
                                    </Link>)}
                            </Masonry>
                        </div>
                    </div>
                    <hr style={{width: '90%', border: '1px solid  #aeaaaa'}}/>
                    <div className={'body-section'}>
                        {news.length > 0 && (
                            <>
                                <div className={'news-part'}>
                                    <p><Link to={'/news'}>Recent News</Link></p>
                                    <div className={'news'}>
                                        {news.map((n, i) =>
                                            <Link to={'/news'} key={i} className={'news-child'}>
                                                <img
                                                    src={n.image?.thumbnail.contentUrl || imageNotFound}
                                                    alt={n.name.slice(0, 25) + '...'}/>
                                                <div>
                                                    <span><b>{n.name.length < 75 ? n.name : n.name.slice(0, 75) + '...'}</b></span>
                                                    <span><img
                                                        src={`https://www.google.com/s2/favicons?domain=${articleURL(n.url)}`}
                                                        alt=""/>{n.provider[0]?.name}</span>
                                                </div>
                                            </Link>)}
                                    </div>
                                </div>
                                <hr className={'hr'}/>
                            </>
                        )}

                        <div
                            className={news.length > 0 ? 'anime-airing-part' : 'anime-airing-part-full'}>
                            <HomeAnimes title={'Top Airing Anime'} link={'airing'}
                                        data={news.length > 0 ? data.slice(0, 8) : data} dynamicClass={'top-airing'}/>
                        </div>
                    </div>

                    <hr style={{width: '90%', border: '1px solid  #aeaaaa'}}/>
                    <div className={'body-section'}>
                        {quotes.length > 0 && (
                            <>
                                <div className={'quotes-part'}>
                                    <p><Link to={'/quotes'}>Random Quotes</Link></p>
                                    {quotes.slice(0, 4).map((q, i) =>
                                        <div key={i}>
                                            <span>({q.anime})</span>
                                            <p>
                                                <q><b>{q.quote.length < 130 ? q.quote : q.quote.slice(0, 130) + '...'}</b></q>
                                            </p>
                                            <p>by {q.character}</p>
                                        </div>)}
                                </div>
                                <hr className={'hr'}/>
                            </>
                        )}
                        <div className={quotes.length > 0 ? 'anime-most-part' : 'anime-most-full-part'}>
                            <HomeAnimes title={'Most Popular Anime'} link={'bypopularity'}
                                        data={quotes.length > 0 ? most_popular_anime.slice(0, 8) : most_popular_anime}
                                        dynamicClass={'most-popular'}/>
                        </div>
                    </div>
                    <hr style={{width: '90%', border: '1px solid  #aeaaaa'}}/>
                    <HomeReviews/>
                    <HomeRecs/>
                    <ToTop/>
                </div>
                <Footer
                    info={'Anime is a medium that transcends cultures and languages, and it has the power to captivate audiences with its unique blend of storytelling, animation, and artistry.'}/>
            </>
    );
};
