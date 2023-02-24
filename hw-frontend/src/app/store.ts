import {configureStore} from "@reduxjs/toolkit";
import {ArtistsReducer} from "../features/artists/ArtistsSlice";
import {albumReducer} from "../features/albums/AlbumSlice";


export const store = configureStore({
  reducer: {
    artists:ArtistsReducer,
    albums:albumReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;