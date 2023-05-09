import React, {FC, useEffect, useRef} from "react";

import {animeActions, animeStuffActions} from "../../../redux";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {AnimeSearchForm} from "../AnimeSearchForm";
import {SearchData} from "../SearchData";
import './AnimeSearchData.scss';

export const AnimeSearchData: FC = () => {
    const {data, searchInput, formActive} = useAppSelector((state) => ({
        data: state.animeReducer.data,
        searchInput: state.animeStuffReducer.searchInput,
        formActive: state.animeStuffReducer.formActive,
    }));
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const searchDataRef = useRef<HTMLDivElement>(null);

    const handleSearchInput = (input: string) => {
        dispatch(animeStuffActions.setSearchInput(input));
    };
    const handleFormActive = (form: boolean) => {
        dispatch(animeStuffActions.setFormActive(form));
    };

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (
            !containerRef.current?.contains(event.relatedTarget as Node) &&
            !searchDataRef.current?.contains(event.relatedTarget as Node)
        ) {
            handleFormActive(false);
        }
    };
    useEffect(() => {
        if (searchInput.length === 0) {
            dispatch(animeActions.resetData());
        } else {
            dispatch(animeActions.getAllByName({
                q: searchInput,
                page: 1,
                limit: 10,
                sfw: true,
            }));
        }
        return () => {
            dispatch(animeActions.resetData());
        };
    }, [searchInput, dispatch]);

    const submit = (data: { search: string }) => {
        handleSearchInput(data.search);
        handleFormActive(true);
    };

    return (
        <div onFocus={() => handleFormActive(true)} ref={containerRef} onBlur={handleBlur} style={{margin: 'auto'}}>
            <AnimeSearchForm onSubmit={submit} name={''} reset={true} viewWidth={'view-width'}/>
            {formActive && (<SearchData data={data} searchInput={searchInput} viewWidth={'view-width'}/>)}
        </div>
    );
};
