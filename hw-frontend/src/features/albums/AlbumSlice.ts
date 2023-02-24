import {Album} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAlbums} from "./albumThunks";
import {RootState} from "../../app/store";

interface AlbumState {
  albums:Album[];
  albumFetching:boolean;
}
const initialState:AlbumState = {
  albums: [],
  albumFetching: false,
}

const AlbumSlice = createSlice({
  name:'albums',
  initialState,
  reducers:{},
  extraReducers:(builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.albumFetching = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state,{payload:albums}) => {
      state.albums = albums;
      state.albumFetching = false;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.albumFetching = false;
    });
  },
});

export const albumReducer = AlbumSlice.reducer;
export const selectAlbums = (state:RootState) => state.albums.albums;
export const selectAlbumsFetching = (state:RootState) => state.albums.albumFetching;