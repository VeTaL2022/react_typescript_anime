import {KeyboardArrowRight} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {seasonActions} from "../../../redux";
import {ISeason} from "../../../interfaces";
import './AnimeSearchSeason.scss';

export const AnimeSearchSeason: FC = () => {
    const {data: seasonData} = useAppSelector(({seasonReducer}) => seasonReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(seasonActions.getAll());
    }, [dispatch]);

    const renderSeason = (seasonName: string, index: number, year: number, i: number) => {
        const {data} = seasonData;
        const season = data[index];
        const link = `/anime/season/${year}/${seasonName}`;

        return (
            <table key={i} className={'season'}>
                <tbody>
                <tr key={`${index}-${year}`}>
                    <td>
                        {season.seasons && (
                            <Link to={link}>
                                <KeyboardArrowRight fontSize='small' aria-label="View more"/>
                                {season.seasons[index]} {year}
                            </Link>
                        )}
                    </td>
                </tr>
                </tbody>
            </table>
        );
    };

    return (
        <div style={{marginTop: 40}}>
            <div className={'season-title'}>
                <span>Seasons</span>
                <Link to={'seasons'}>View More</Link>
            </div>

            <table className={'season-container'}>
                <tbody>
                <tr>
                    {['winter', 'spring', 'summer', 'fall'].map((seasonName: string, index: number) => (
                        <td key={index} style={{padding: 0}}>
                            {seasonData.data?.slice(0, 5).map((seasonYear: ISeason, i) => renderSeason(seasonName, index, seasonYear.year, i))}
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
};
