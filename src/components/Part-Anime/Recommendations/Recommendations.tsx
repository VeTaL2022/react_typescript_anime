import {Pagination, Stack} from "@mui/material";
import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {homeResourcesActions} from "../../../redux";
import {AnimeRecs} from "../AnimeRecs";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import {ToTop} from "../../ToTop";
import './Recommendations.scss';

export const Recommendations: FC = () => {
    const {recsData, loading, recsPage} = useAppSelector(({homeResourcesReducer}) => homeResourcesReducer);
    const {pagination, data} = recsData;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(homeResourcesActions.getRecsData({page: recsPage}));
    }, [dispatch, recsPage]);

    const handleCurrentPage = (page: number) => {
        dispatch(homeResourcesActions.setRecsPage(page));
    }

    return (
        loading ? <Loader height={100}/> :
            <>
                    <div className={'recommendations'}>
                        <h4>Anime Recommendations</h4>
                        {pagination?.last_visible_page > 1 && (
                            <Stack>
                                <Pagination
                                    count={pagination?.last_visible_page}
                                    shape={'rounded'}
                                    hidePrevButton
                                    hideNextButton
                                    size={'small'}
                                    page={recsPage}
                                    onChange={(event, page) => {
                                        handleCurrentPage(page);
                                        window.scrollTo(0, 0);
                                    }}
                                    className={'recs_pagination'}
                                />
                            </Stack>
                        )}
                    </div>
                    <>
                        {data?.length > 0 ? (
                        <div className={'rec-container'}>
                            {data?.map((anime, index) => <AnimeRecs animeRecs={anime} key={index}/>)}
                        </div>
                        ): <div>
                            <p>{recsData.status} - {recsData.type}</p>
                            <p>{recsData.message}</p>
                        </div>}

                        <div className={'recs-footer'}>
                            {pagination?.last_visible_page > 1 && (
                                <Stack>
                                    <Pagination
                                        count={pagination?.last_visible_page}
                                        shape={'rounded'}
                                        page={recsPage}
                                        onChange={(event, page) => {
                                            handleCurrentPage(page);
                                            window.scrollTo(0, 0);
                                        }}
                                        className={'recs_pagination'}
                                    />
                                </Stack>
                            )}
                        </div>
                    </>
                <Footer
                    info={'Anime has diverse genres, including popular titles like Attack on Titan and Fullmetal Alchemist. Get recommendations from friends or check out curated lists on Netflix, Crunchyroll, or Funimation.'}/>
                <ToTop/>
            </>
    );
};
