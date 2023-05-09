import InfiniteScroll from "react-infinite-scroll-component";
import React, {FC, useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {newsActions} from "../../../redux";
import {NewsCard} from "../NewsCard";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import {ToTop} from "../../ToTop";
import './News.scss';

export const News: FC = () => {
    const {news, offset, totalResults, error} = useAppSelector(({newsReducer}) => newsReducer);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        dispatch(newsActions.getAll({
            q: 'anime',
            sortBy: 'date',
            setLang: 'en',
            safeSearch: 'strict',
            count: 17,
            offset: offset,
        }))
    }, [offset]);

    useEffect(() => {
        dispatch(newsActions.reset());
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    }, []);

    const uniqueNews = Array.from(new Set(news.map(article => article.name))).map(name => {
        return news.find(article => article.name === name);
    });

    return (
        loading ? <Loader height={100}/> :
            <InfiniteScroll
                loader={''}
                hasMore={offset < 90} dataLength={totalResults}
                next={() => dispatch(newsActions.setOffSet(offset + 15))}>
                <div className={'news-container'} style={{marginBottom: offset < 90 ? 15 : 20}}>
                    {error.error ? (<div style={{height: '60vh', display: 'flex',flexDirection: 'column', justifyContent: 'center'}}>
                        <p>Status Code - {error.error.code}</p>
                        <p>{error.error.message}</p>
                    </div>) : (
                        <>
                            {uniqueNews.map((article, index) => <NewsCard article={article} key={index}/>)}
                        </>
                    )}
                </div>

                <Footer
                    info={'News anime presents news and current events in an entertaining way, covering various topics and offering unique perspectives.'}/>
                <ToTop/>
            </InfiniteScroll>
    );
};
