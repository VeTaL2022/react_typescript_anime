import React, {FC, useEffect} from "react";
import Masonry from "react-masonry-css";
import {Button} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {QuoteSearchForm} from "../QuoteSearchForm";
import {quoteActions} from "../../../redux";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import {Quote} from "../Quote";
import './Quotes.scss';

export const Quotes: FC = () => {
    const {quotes, loading, error, toggle, value, currentPage} = useAppSelector(({quoteReducer}) => quoteReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (toggle === 'Title' && value) {
            dispatch(quoteActions.getAllByTitle({title: value, page: currentPage}));
        } else if (toggle === 'Character' && value) {
            dispatch(quoteActions.getAllByCharacter({name: value, page: currentPage}));
        } else {
            dispatch(quoteActions.getAllRandom());
            dispatch(quoteActions.setError({error: ''}));
        }
    }, [value, currentPage]);

    const breakpointColumnsObj = {
        default: 2,
        450: 1,
    };
    const handleToggle = (t: string) => {
        dispatch(quoteActions.setToggle(t));
    }
    const handleValue = (v: string) => {
        dispatch(quoteActions.setValue(v));
    }
    const handleCurrentPage = (page: number) => {
        dispatch(quoteActions.setCurrentPage(page));
    }
    return (
        <>
            <div className={'quotes-container'}>
                <QuoteSearchForm setValue={handleValue} toggle={toggle} setToggle={handleToggle}
                                 setCurrentPage={handleCurrentPage}/>

                {error?.error === '' && <Button onClick={() => handleCurrentPage(currentPage + 1)} color={'warning'}
                                                variant={'outlined'} className={'btn'}>Refresh</Button>}
                {loading ? <Loader height={50}/> : (
                    <>
                        {error?.error === '' && quotes.length > 0 ? (
                            <Masonry breakpointCols={breakpointColumnsObj} className={'quotes-masonry-grid'}
                                     columnClassName={'quotes-masonry-grid_column'}>
                                {quotes.map((quote, index) => <Quote quote={quote} key={index}/>)}
                            </Masonry>
                        ) : error && <h4>{error.error}</h4>}
                        <Footer
                            info={'Anime quotes are iconic and inspire fans with powerful messages about life, love, and friendship.'}/>
                    </>
                )}
            </div>
        </>
    );
};
