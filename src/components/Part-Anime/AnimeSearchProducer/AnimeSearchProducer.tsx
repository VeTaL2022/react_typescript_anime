import {KeyboardArrowRight} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {producerActions} from "../../../redux";
import './AnimeSearchProducer.scss';

export const AnimeSearchProducer:FC = () => {
    const {data} = useAppSelector(({producerReducer}) => producerReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(producerActions.getAll({
            order_by: 'favorites',
            sort: 'desc',
            page: 1,
            limit: 25
        }))
    }, [dispatch]);

    return (
        <div className={'producers-main'}>
            <div className={'producer-navigation'}>
                <span>Studios</span>
                <Link to={'producers'}>View More</Link>
            </div>
            <div className={'producer-container'}>
                {data.map((producer, index) =>
                    <div key={index}>
                        <Link to={`producer/${producer.mal_id}/${producer.titles[0].title}`}>
                            <KeyboardArrowRight fontSize='small'/>
                            {producer.titles[0].title} ({producer.count})
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
