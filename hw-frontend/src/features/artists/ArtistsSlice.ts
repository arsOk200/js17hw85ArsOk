import {Artist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createArtist, fetchAllArtists} from "./ArtistsThunks";

interface ArtistState {
  artists:Artist[];
  artistFetching:boolean;
  artistCreating:boolean;
}
const initialState :ArtistState ={
  artists:[],
  artistFetching:false,
  artistCreating:false,
}

const ArtistsSlice = createSlice({
  name:'artists',
  initialState,
  reducers:{},
  extraReducers:(builder) => {
    builder.addCase(fetchAllArtists.pending, (state) => {
      state.artistFetching = true;
    });
    builder.addCase(fetchAllArtists.fulfilled, (state,{payload:artists}) => {
      state.artists = artists;
      state.artistFetching = false;
    });
    builder.addCase(fetchAllArtists.rejected, (state) => {
      state.artistFetching = false;
    });

    builder.addCase(createArtist.pending, (state) => {
      state.artistCreating = true;
    });
    builder.addCase(createArtist.fulfilled, (state) => {
      state.artistCreating = false;
    });
    builder.addCase(createArtist.rejected, (state) => {
      state.artistCreating = false;
    });
  },
});

export const ArtistsReducer = ArtistsSlice.reducer;
export const selectArtists = (state:RootState) => state.artists.artists
export const selectArtistCreating = (state:RootState) => state.artists.artistCreating;
export const selectArtistsFetching = (state:RootState) => state.artists.artistFetching;

