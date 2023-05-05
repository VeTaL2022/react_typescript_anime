import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IState {
    searchInput: string,
    formActive: boolean,
    expand: number;
    hoveredAnime: number | null,
}

const initialState: IState = {
    searchInput: '',
    formActive: false,
    expand: 2,
    hoveredAnime: null,
}

const animeStuffSlice = createSlice({
    name: 'stuffSlice',
    initialState,
    reducers: {
        setSearchInput: (state, action: PayloadAction<string>) => {
            state.searchInput = action.payload;
        },
        setFormActive: (state, action: PayloadAction<boolean>) => {
            state.formActive = action.payload;
        },
        resetForm: () => initialState,
        setExpand: (state, action: PayloadAction<number>) => {
            state.expand = action.payload;
        },
        setHoveredAnime: (state, action: PayloadAction<number | null>) => {
            state.hoveredAnime = action.payload;
        }
    }
});

const {
    reducer: animeStuffReducer,
    actions: {setSearchInput, setFormActive, setExpand, setHoveredAnime, resetForm}
} = animeStuffSlice;

const animeStuffActions = {setSearchInput, setFormActive, setExpand, setHoveredAnime, resetForm};

export {animeStuffActions, animeStuffReducer};
