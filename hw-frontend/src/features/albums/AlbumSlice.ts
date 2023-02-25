import {Album} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAlbums, fetchOneAlbum} from "./albumThunks";
import {RootState} from "../../app/store";

interface AlbumState {
  albums:Album[];
  albumFetching:boolean;
  oneAlbum:Album | null;
  oneAlbumFetching:boolean;
}
const initialState:AlbumState = {
  albums: [],
  oneAlbum:null,
  oneAlbumFetching:false,
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

    builder.addCase(fetchOneAlbum.pending, (state) => {
      state.oneAlbumFetching = true;
    });
    builder.addCase(fetchOneAlbum.fulfilled, (state,{payload:album}) => {
      state.oneAlbum = album;
      state.oneAlbumFetching = false;
    });
    builder.addCase(fetchOneAlbum.rejected, (state) => {
      state.oneAlbumFetching = false;
    });
  },
});

export const albumReducer = AlbumSlice.reducer;
export const selectAlbums = (state:RootState) => state.albums.albums;
export const selectOneAlbum = (state:RootState) => state.albums.oneAlbum;
export const selectOneAlbumFetching = (state:RootState) => state.albums.oneAlbumFetching;
export const selectAlbumsFetching = (state:RootState) => state.albums.albumFetching;