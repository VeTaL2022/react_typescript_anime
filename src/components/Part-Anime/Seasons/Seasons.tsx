import {KeyboardArrowRight} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {seasonActions} from "../../../redux";
import {ISeason} from "../../../interfaces";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import {ToTop} from "../../ToTop";
import "./Seasons.scss";

export const Seasons: FC = () => {
    const {data: seasonData, loading} = useAppSelector(({seasonReducer}) => seasonReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(seasonActions.getAll());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const renderSeason = (seasonName: string, index: number, year: number) => {
        const {data: seasons} = seasonData;
        const season = seasons[index];
        const link = `/anime/season/${year}/${seasonName}`;

        return (
            <div key={`${index}-${year}`}>
                {season.seasons && (
                    <Link to={link}>
                        <KeyboardArrowRight fontSize='small' aria-label="View more"/>
                        {season.seasons[index]} {year}
                    </Link>
                )}
            </div>
        );
    };

    return (
        loading ? <Loader height={100}/> :
            <>
                <div className={'seasons-container'}>
                    <h2>All Seasons</h2>
                    <div className={'seasons'}>
                        {['winter', 'spring', 'summer', 'fall'].map((seasonName: string, index: number) => (
                            <div className='season-child' key={index}>
                                {seasonData.data?.slice(0, 61)?.map((seasonYear: ISeason) => renderSeason(seasonName, index, seasonYear.year))}
                            </div>
                        ))}
                    </div>
                </div>
                <Footer
                    info={'Anime seasons are four times a year when new anime shows release in Japan, bringing different genres and themes for fans. It\'s an exciting time to discover new series and engage in discussions.'}/>
                <ToTop/>
            </>
    );
};
