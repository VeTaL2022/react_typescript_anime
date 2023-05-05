import {FC, useEffect, useState} from "react";

import {AnimeSearchProducer} from "../AnimeSearchProducer";
import {AnimeSearchRanking} from "../AnimeSearchRanking";
import {AnimeSearchSeason} from "../AnimeSearchSeason";
import {AnimeSearchGenre} from "../AnimeSearchGenre";
import {AnimeSearchData} from "../AnimeSearchData";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import './AnimeSearch.scss';

export const AnimeSearch: FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, []);

    return (
        loading ? <Loader height={100}/> :
            <>
                <div className={'anime-search'}>
                    <AnimeSearchData/>
                    <AnimeSearchGenre/>
                    <AnimeSearchProducer/>
                    <AnimeSearchRanking/>
                    <AnimeSearchSeason/>
                </div>
                <Footer
                    info={'Anime genres classify shows by themes and styles, produced by studios. Searching for genres helps find new series. Studios have unique styles and strengths, influencing the type of anime they produce.'}/>
            </>
    );
};
