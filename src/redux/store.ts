import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {
    animeReducer,
    animeResourcesReducer,
    animeStuffReducer,
    characterReducer,
    homeResourcesReducer,
    imageReducer,
    newsReducer,
    personReducer,
    producerReducer,
    quoteReducer,
    seasonReducer,
} from "./slices";

const rootReducer = combineReducers({
    animeReducer,
    newsReducer,
    quoteReducer,
    imageReducer,
    producerReducer,
    seasonReducer,
    characterReducer,
    personReducer,
    animeResourcesReducer,
    homeResourcesReducer,
    animeStuffReducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer
});

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type {
    AppDispatch, AppStore, RootState
}
