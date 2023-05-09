import {FC, useEffect, useState} from "react";
import {Search} from "@mui/icons-material";
import {useForm} from "react-hook-form";

import {useAppDispatch} from "../../../hooks";
import {animeActions, animeStuffActions} from "../../../redux";
import "./AnimeSearchForm.scss";

interface SearchFormData {
    search: string;
}

interface IProps {
    onSubmit: (data: SearchFormData) => void,
    name: string,
    reset: boolean,
    viewWidth: string,
}

export const AnimeSearchForm: FC<IProps> = ({onSubmit, name, reset, viewWidth}) => {
    const {register, handleSubmit} = useForm<SearchFormData>();
    const dispatch = useAppDispatch();

    const [searchValue, setSearchValue] = useState<string>(name || '');

    useEffect(() => {
        if (searchValue.length === 0 && reset) {
            dispatch(animeActions.resetData());
            dispatch(animeStuffActions.setSearchInput(''));
        }
    }, [searchValue, dispatch, reset]);

    const submit = (data: SearchFormData) => {
        if (searchValue.trim() !== '' && searchValue.length > 2) {
            onSubmit(data);
        }
    };

    return (
        <form className="search-form" onSubmit={handleSubmit(submit)}>
            <div className={`input-container ${viewWidth}`}>
                <input className="search-input" type="text" {...register("search")}
                       placeholder="Search Anime..."
                       defaultValue={searchValue}
                       onKeyUp={(event) => setSearchValue((event.target as HTMLInputElement).value)}
                />
                <div onClick={handleSubmit(submit)}
                     className={searchValue.length > 2 ? "search-icon active" : "search-icon"}>
                    <Search/>
                </div>
            </div>
        </form>

    );
};
