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
    const {articles, currentPage} = useAppSelector(({newsReducer}) => newsReducer);
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        dispatch(newsActions.getAll({
            q: 'anime',
            language: 'en',
            sortBy: 'publishedAt',
            page: currentPage,
            pageSize: 15,
            searchIn: 'title',
            apiKey: import.meta.env.VITE_NEWS_API_KEY
        }));
    }, [currentPage]);


    useEffect(() => {
        dispatch(newsActions.reset());
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    }, []);

    return (
        loading ? <Loader height={100}/> :
            <InfiniteScroll
                loader={''}
                hasMore={currentPage < 6} dataLength={articles.length}
                next={() => dispatch(newsActions.setCurrentPage(currentPage + 1))}>
                <div className={'news-container'} style={{marginBottom: currentPage !== 6 ? 15 : 20}}>
                    {articles.map((article, index) => <NewsCard article={article} key={index}/>)}
                </div>
                <Footer
                    info={'News anime presents news and current events in an entertaining way, covering various topics and offering unique perspectives.'}/>
                <ToTop/>
            </InfiniteScroll>
    );
};
