import {configureStore} from "@reduxjs/toolkit";
import {ArtistsReducer} from "../features/artists/ArtistsSlice";


export const store = configureStore({
  reducer: {
    artists:ArtistsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;