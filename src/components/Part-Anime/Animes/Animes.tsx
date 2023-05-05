import {Pagination, Stack} from "@mui/material";
import {useParams} from "react-router-dom";
import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {IAnimeData} from "../../../interfaces";
import {AnimesHeader} from "../AnimesHeader";
import {animeActions} from "../../../redux";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import {ToTop} from "../../ToTop";
import {Anime} from "../Anime";
import "./Animes.scss";

export const Animes: FC = () => {
    const {
        data,
        pagination,
        loading,
        currentPage,
        sorted,
        open
    } = useAppSelector(({animeReducer}) => animeReducer);
    const dispatch = useAppDispatch();
    const {
        selectedGenre = '',
        selectedProducer = '',
        selectedType = '',
        selectedYear = '',
        selectedSeason = '',
    } = useParams();

    const getAnimeData = (params: any) => {
        dispatch(animeActions.getAll({page: currentPage, limit: 25, sfw: true, ...params}));
    };
    const handleCurrentPage = (page: number) => {
        dispatch(animeActions.setCurrentPage(page));
    };
    const handleSorted = (sort: string) => {
        dispatch(animeActions.setSorted(sort));
    };
    const handleOpen = (o: boolean) => {
        dispatch(animeActions.setOpen(o));
    };

    useEffect(() => {
        switch (true) {
            case selectedGenre !== '':
                getAnimeData({
                    order_by: sorted,
                    sort: sorted === 'title' ? 'asc' : 'desc',
                    genres: selectedGenre,
                    producers: '',
                    many: true,
                });
                break;
            case selectedProducer !== '':
                getAnimeData({
                    order_by: sorted,
                    sort: sorted === 'title' ? 'asc' : 'desc',
                    genres: '',
                    producers: selectedProducer,
                    many: true,
                });
                break;
            case selectedType !== '':
                if (['airing', 'upcoming', 'bypopularity', 'favorite'].includes(selectedType)) {
                    dispatch(animeActions.getTop({type: '', filter: selectedType, page: currentPage, limit: 25}));
                } else {
                    dispatch(animeActions.getTop({type: selectedType, filter: '', page: currentPage, limit: 25}));
                }
                break;
            case selectedYear !== '' && selectedSeason !== '':
                dispatch(animeActions.getAllBySeason({
                    year: Number(selectedYear),
                    season: selectedSeason,
                    page: currentPage
                }));
                break;
            default:
                dispatch(animeActions.getTop({type: '', filter: '', page: currentPage, limit: 25}));
                break;
        }
    }, [sorted, currentPage, selectedGenre, selectedProducer, selectedType, selectedYear, selectedSeason]);

    return (
        <>
            {loading ? <Loader height={100}/> : (
                <>
                    {data.length && (
                        <>
                            <div className={'animes-header'}>
                                <AnimesHeader open={open} setOpen={handleOpen} sorted={sorted}
                                              setSorted={handleSorted}
                                              selectedType={selectedType} selectedYear={selectedYear}
                                              selectedSeason={selectedSeason} selectedProducer={selectedProducer}
                                              setCurrentPage={handleCurrentPage}
                                />

                                <div className={'animes-container'}>
                                    {data.map((anime: IAnimeData, index: number) => <Anime anime={anime} key={index}/>)}
                                </div>
                            </div>

                            {pagination.last_visible_page > 1 &&
                                (<Stack>
                                    <Pagination
                                        count={pagination.last_visible_page}
                                        page={currentPage}
                                        onChange={(event, page) => {
                                            handleCurrentPage(page);
                                        }}
                                        className={'pagination'}
                                    />
                                </Stack>)}
                        </>
                    )}
                    <Footer
                        info={'Anime is Japanese animation with complex storylines, memorable characters, and stunning visuals that has gained a massive following worldwide.'}/>
                </>
            )}
            <ToTop/>
        </>
    );
};
