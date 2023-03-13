import {Album} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createAlbum, DeleteAlbum, fetchAlbums, fetchAllAlbums, fetchOneAlbum, PublishAlbum} from "./albumThunks";
import {RootState} from "../../app/store";

interface AlbumState {
  albums:Album[];
  albumFetching:boolean;
  oneAlbum:Album | null;
  oneAlbumFetching:boolean;
  albumCreating:boolean;
  albumsWithoutId:Album[];
  albumsWithoutIdFetching:boolean;
  deletingAlbum:false| string;
  publishingAlbum:false|string;
}
const initialState:AlbumState = {
  albums: [],
  oneAlbum:null,
  oneAlbumFetching:false,
  albumFetching: false,
  albumCreating:false,
  albumsWithoutId:[],
  albumsWithoutIdFetching:false,
  deletingAlbum:false,
  publishingAlbum:false,
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

    builder.addCase(DeleteAlbum.pending, (state,{meta:{arg:albumID}}) => {
      state.deletingAlbum = albumID;
    });
    builder.addCase(DeleteAlbum.fulfilled, (state) => {
      state.deletingAlbum = false;
    });
    builder.addCase(DeleteAlbum.rejected, (state) => {
      state.deletingAlbum = false;
    });

    builder.addCase(PublishAlbum.pending, (state,{meta:{arg:albumID}}) => {
      state.publishingAlbum = albumID;
    });
    builder.addCase(PublishAlbum.fulfilled, (state) => {
      state.publishingAlbum = false;
    });
    builder.addCase(PublishAlbum.rejected, (state) => {
      state.publishingAlbum = false;
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
export const selectAlbumDeleting = (state:RootState) => state.albums.deletingAlbum;
export const selectAlbumPublishing = (state:RootState) => state.albums.publishingAlbum;
export const selectAlbumsWithoutIDFetching = (state:RootState) => state.albums.albumsWithoutIdFetching;
