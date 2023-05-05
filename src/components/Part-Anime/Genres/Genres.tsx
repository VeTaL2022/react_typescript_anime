import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {IAnimeGenre} from "../../../interfaces";

interface Props {
    setGenre: (genre: string) => void;
    genres: IAnimeGenre[];
    genre: string
}

export const Genres: FC<Props> = ({setGenre, genres, genre}) => {
    const [selectedGenre, setSelectedGenre] = useState<string>(genre);
    const navigate = useNavigate();

    const handleSelectChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        setSelectedGenre(value);
        setGenre(value);
    };

    useEffect(() => {
        setSelectedGenre(genre || '');
        if (!genre && navigate) {
            navigate('');
        }
    }, [genre]);

    const genreNavigation = (name: string) => {
        if (!genre) {
            navigate(`?genre=${name}`);
        }
    }

    return (
        <Box sx={{minWidth: 100}}>
            <FormControl fullWidth variant={'outlined'} size={'small'} className={'form-genre'}>
                <InputLabel className={'input-label'}>Genres</InputLabel>
                <Select
                    label={'Genres'}
                    className={'select'}
                    value={selectedGenre}
                    onChange={handleSelectChange}
                >
                    {genres.map((genre) => (
                        <MenuItem key={genre.mal_id} value={genre.mal_id} className={'menu-item'}
                                  onClick={() => genreNavigation(genre.name)}>
                            {genre.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
