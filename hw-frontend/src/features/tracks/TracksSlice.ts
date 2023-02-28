import {Track, TrackHistory} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {addTrackToHistory, fetchTrackHistory, fetchTracks} from "./TracksThunks";

interface TracksState{
  tracks:Track[];
  tracksFetching:boolean;
  trackAdd:boolean;
  history: TrackHistory[];
  historyLoading:boolean
}

const initialState:TracksState = {
  tracks:[],
  history:[],
  historyLoading:false,
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


    builder.addCase(fetchTrackHistory.pending, (state) => {
      state.historyLoading = true;
    })
    builder.addCase(fetchTrackHistory.fulfilled, (state,{payload:history}) => {
      state.historyLoading = false;
      state.history = history;
    })
    builder.addCase(fetchTrackHistory.rejected, (state) => {
      state.historyLoading = false;
    })
  },
});

export const TracksReducer = TracksSlice.reducer;
export const selectTracks = (state:RootState) => state.tracks.tracks;
export const selectTracksAdding = (state:RootState) => state.tracks.trackAdd;
export const selectHistory = (state:RootState) => state.tracks.history;
export const selectHistoryLoading = (state:RootState) => state.tracks.historyLoading;
export const selectTracksFetching = (state:RootState) => state.tracks.tracksFetching;