import {Route, Routes} from "react-router-dom";
import {FC, useEffect, useState} from "react";
import {LinearProgress} from "@mui/material";

import {
    Home,
    Animes,
    Images,
    Quotes,
    Person,
    Review,
    Search,
    Seasons,
    SideBar,
    News,
    Producers,
    Character,
    AnimeSearch,
    AnimeDetails,
    RecentReviews,
    ImagesCategory,
    Recommendations,
    CharactersStaff,
} from "../../components";
import './RoutingPage.scss';

export const RoutingPage: FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [sideBar, setSideBar] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);

    const showSideBar = (): void => {
        setSideBar(!sideBar);
        setActive(!active);
    }

    const hideSideBar = (): void => {
        if (sideBar) {
            setActive(false);
            setSideBar(false);
        }
    }

    //first loading of the page
    useEffect((): void => {
        setTimeout(() => setLoading(false), 2000);
    }, []);

    return (
        <div className={'routing-page'}>
            <SideBar sideBar={sideBar} showSideBar={showSideBar}/>

            {loading ? <LinearProgress className={'progress'} color={"inherit"}/> : (
                <div onClick={hideSideBar}>
                    <div style={{filter: active ? 'blur(5px)' : 'none', pointerEvents: sideBar ? 'none' : 'auto'}}>
                        <Routes>
                            <Route path={'/home'} element={<Home/>}/>

                            <Route path={'/anime'} element={<AnimeSearch/>}/>
                            <Route path={'/anime/top'} element={<Animes/>}/>
                            <Route path={'/anime/type/:selectedType'} element={<Animes/>}/>
                            <Route path={'/anime/:selectedId/*'} element={<AnimeDetails/>}/>
                            <Route path={'/anime/genre/:selectedGenre/:chosenGenre'} element={<Animes/>}/>
                            <Route path={'/anime/season/:selectedYear/:selectedSeason'} element={<Animes/>}/>
                            <Route path={'/anime/producer/:selectedProducer/:chosenProducer'} element={<Animes/>}/>

                            <Route path={'/anime/search'} element={<Search/>}/>
                            <Route path={'/anime/seasons'} element={<Seasons/>}/>
                            <Route path={'/anime/producers'} element={<Producers/>}/>
                            <Route path={'/anime/reviews'} element={<RecentReviews/>}/>
                            <Route path={'/anime/recommendations'} element={<Recommendations/>}/>
                            <Route path={'/anime/:selectedAnime/review/:selectedReview'} element={<Review/>}/>

                            <Route path={'/people/:selectedPerson/*'} element={<Person/>}/>
                            <Route path={'/character/:selectedCharacter/*'} element={<Character/>}/>
                            <Route path={'/anime/:selectedAnime/characters'} element={<CharactersStaff/>}/>

                            <Route path={'/images'} element={<Images/>}/>
                            <Route path={'/images/category'} element={<ImagesCategory/>}/>
                            <Route path={'/images/category/:selectedCategory'} element={<Images/>}/>

                            <Route path={'/quotes/*'} element={<Quotes/>}/>
                            <Route path={'/news'} element={<News/>}/>
                        </Routes>
                    </div>
                </div>
            )}
        </div>
    );
};
