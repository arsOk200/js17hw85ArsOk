import {Album} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createAlbum, fetchAlbums, fetchAllAlbums, fetchOneAlbum} from "./albumThunks";
import {RootState} from "../../app/store";

interface AlbumState {
  albums:Album[];
  albumFetching:boolean;
  oneAlbum:Album | null;
  oneAlbumFetching:boolean;
  albumCreating:boolean;
  albumsWithoutId:Album[];
  albumsWithoutIdFetching:boolean;
}
const initialState:AlbumState = {
  albums: [],
  oneAlbum:null,
  oneAlbumFetching:false,
  albumFetching: false,
  albumCreating:false,
  albumsWithoutId:[],
  albumsWithoutIdFetching:false,
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


    builder.addCase(createAlbum.pending, (state) => {
      state.albumCreating = true;
    });
    builder.addCase(createAlbum.fulfilled, (state) => {
      state.albumCreating = false;
    });
    builder.addCase(createAlbum.rejected, (state) => {
      state.albumCreating = false;
    });

    builder.addCase(fetchAllAlbums.pending, (state) => {
      state.albumsWithoutIdFetching = true;
    });
    builder.addCase(fetchAllAlbums.fulfilled, (state,{payload:albums}) => {
      state.albumsWithoutIdFetching = false;
      state.albumsWithoutId = albums;
    });
    builder.addCase(fetchAllAlbums.rejected, (state) => {
      state.albumsWithoutIdFetching = false;
    });
  },
});

export const albumReducer = AlbumSlice.reducer;
export const selectAlbums = (state:RootState) => state.albums.albums;
export const selectOneAlbum = (state:RootState) => state.albums.oneAlbum;
export const selectOneAlbumFetching = (state:RootState) => state.albums.oneAlbumFetching;
export const selectAlbumsFetching = (state:RootState) => state.albums.albumFetching;
export const selectAlbumCreating = (state:RootState) => state.albums.albumCreating;
export const selectAlbumsWithoutID = (state:RootState) => state.albums.albumsWithoutId;
export const selectAlbumsWithoutIDFetching = (state:RootState) => state.albums.albumsWithoutIdFetching;
