import {Track} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {addTrackToHistory, fetchTracks} from "./TracksThunks";

interface TracksState{
  tracks:Track[];
  tracksFetching:boolean;
  trackAdd:boolean;
}

const initialState:TracksState = {
  tracks:[],
  trackAdd:false,
  tracksFetching:false,
}

const TracksSlice = createSlice({
  name:'tracks',
  initialState,
  reducers:{},
  extraReducers:(builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.tracksFetching = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, {payload:tracks}) => {
      state.tracks = tracks;
      state.tracksFetching = false;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.tracksFetching = false;
    })
    builder.addCase(addTrackToHistory.pending, (state) => {
      state.trackAdd = true;
    })
    builder.addCase(addTrackToHistory.fulfilled, (state) => {
      state.trackAdd = false;
    })
    builder.addCase(addTrackToHistory.rejected, (state) => {
      state.trackAdd = false;
    })

  },
});

export const TracksReducer = TracksSlice.reducer;
export const selectTracks = (state:RootState) => state.tracks.tracks;
export const selectTracksFetching = (state:RootState) => state.tracks.tracksFetching;