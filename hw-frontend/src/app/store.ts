import {configureStore} from "@reduxjs/toolkit";
import {ArtistsReducer} from "../features/artists/ArtistsSlice";
import {albumReducer} from "../features/albums/AlbumSlice";
import {TracksReducer} from "../features/tracks/TracksSlice";
import {usersReducer} from "../features/user/userSlice";


export const store = configureStore({
  reducer: {
    artists:ArtistsReducer,
    albums:albumReducer,
    tracks:TracksReducer,
    users:usersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;