import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {useAppDispatch} from "../../../hooks";
import {animeActions} from "../../../redux";
import "./AnimeSearchForm.scss";

interface SearchFormData {
    search: string;
}

interface IProps {
    onSubmit: (data: SearchFormData) => void,
    name: string,
    reset: boolean,
}

export const AnimeSearchForm: FC<IProps> = ({onSubmit, name, reset}) => {
    const {register, handleSubmit} = useForm<SearchFormData>();
    const dispatch = useAppDispatch();

    const [searchValue, setSearchValue] = useState<string>(name || '');

    useEffect(() => {
        if (searchValue === '' && reset) {
            dispatch(animeActions.resetData());
        }
    }, [searchValue, dispatch, reset]);

    const submit = (data: SearchFormData) => {
        if (searchValue.trim() !== '' && searchValue.length > 2) {
            onSubmit(data);
        }
    };

    const buttonClassName = searchValue.length <= 2 ? "search-form__button search-form__button--gray" : "search-form__button search-form__button--blue";

    return (
        <form className="search-form" onSubmit={handleSubmit(submit)}>
            <input className="search-form__input" type="text" {...register("search")}
                   placeholder={'Search Anime...'} defaultValue={searchValue}
                   onKeyUp={(event) => setSearchValue((event.target as HTMLInputElement).value)}
            />
            <button className={buttonClassName}>Search</button>
        </form>
    );
};
