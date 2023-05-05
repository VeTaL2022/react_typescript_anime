import React, {FC, useEffect, useRef} from "react";

import {animeActions, animeStuffActions} from "../../../redux";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {AnimeSearchForm} from "../AnimeSearchForm";
import {SearchData} from "../SearchData";

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
        if (searchInput === '') {
            dispatch(animeActions.resetData());
        } else {
            dispatch(animeActions.getAllByName({
                q: searchInput,
                page: 1,
                limit: 10,
                sfw: true,
            }));
        }
    }, [searchInput, dispatch]);

    const submit = (data: { search: string }) => {
        handleSearchInput(data.search);
        handleFormActive(true);
    };
    useEffect(() => {
        dispatch(animeActions.resetData());
        dispatch(animeStuffActions.resetForm());
    }, []);

    return (
        <div onFocus={() => handleFormActive(true)} onBlur={handleBlur} ref={containerRef}
             style={{width: '61%', margin: 'auto'}}>
            <AnimeSearchForm onSubmit={submit} name={''} reset={true}/>
            {formActive && (<SearchData data={data} searchInput={searchInput}/>)}
        </div>
    );
};
