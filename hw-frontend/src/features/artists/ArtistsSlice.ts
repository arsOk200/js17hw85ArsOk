import {Artist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchAllArtists} from "./ArtistsThunks";

interface ArtistState {
  artists:Artist[];
  artistFetching:boolean;
}
const initialState :ArtistState ={
  artists:[],
  artistFetching:false,
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
  },
});

export const ArtistsReducer = ArtistsSlice.reducer;
export const selectArtists = (state:RootState) => state.artists.artists
export const selectArtistsFetching = (state:RootState) => state.artists.artistFetching;

