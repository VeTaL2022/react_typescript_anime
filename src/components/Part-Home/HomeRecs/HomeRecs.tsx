import {Link} from "react-router-dom";
import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {AnimeRecs} from "../../Part-Anime/AnimeRecs";
import {homeResourcesActions} from "../../../redux";
import './HomeRecs.scss';

export const HomeRecs: FC = () => {
    const {recsData} = useAppSelector(({homeResourcesReducer}) => homeResourcesReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(homeResourcesActions.getRecsData({page: 1}));
    }, [dispatch]);

    return (
        <div className={'home-recs'}>
            <div className={'home-recs-header'}>
                <h4>Latest Anime Recommendations</h4>
                <span><Link to={'/anime/recommendations'}>View More</Link></span>
            </div>
            <div style={{margin: '10px 10px 0 10px'}}>
                {recsData.data.slice(0, 5).map((recs, index) => <AnimeRecs animeRecs={recs} key={index}/>)}
            </div>
        </div>
    );
};
