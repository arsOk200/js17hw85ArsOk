import {Track, TrackHistory} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {
  addTrackToHistory,
  createTrack,
  DeleteTrack,
  fetchTrackHistory,
  fetchTracks,
  PublishTrack
} from "./TracksThunks";

interface TracksState{
  tracks:Track[];
  tracksFetching:boolean;
  trackAdd:boolean;
  history: TrackHistory[];
  historyLoading:boolean;
  creatingTrack:boolean;
  deletingTrack:false | string;
  publishingTrack:false |string;
}

const initialState:TracksState = {
  tracks:[],
  history:[],
  historyLoading:false,
  trackAdd:false,
  tracksFetching:false,
  creatingTrack:false,
  deletingTrack:false,
  publishingTrack:false,
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

    builder.addCase(createTrack.pending, (state) => {
      state.creatingTrack = true;
    })
    builder.addCase(createTrack.fulfilled, (state) => {
      state.creatingTrack = false;
    });
    builder.addCase(createTrack.rejected, (state) => {
      state.creatingTrack = false;
    });

    builder.addCase(DeleteTrack.pending , (state, {meta:{arg:trackID}}) => {
      state.deletingTrack = trackID;
    });
    builder.addCase(DeleteTrack.fulfilled , (state) => {
      state.deletingTrack = false;
    });
    builder.addCase(DeleteTrack.rejected , (state) => {
      state.deletingTrack = false;
    });

    builder.addCase(PublishTrack.pending , (state, {meta:{arg:trackID}}) => {
      state.publishingTrack = trackID;
    });
    builder.addCase(PublishTrack.fulfilled , (state) => {
      state.publishingTrack = false;
    });
    builder.addCase(PublishTrack.rejected , (state) => {
      state.publishingTrack = false;
    });
  },
});

export const TracksReducer = TracksSlice.reducer;
export const selectTracks = (state:RootState) => state.tracks.tracks;
export const creatingTrack = (state:RootState) => state.tracks.creatingTrack;
export const selectDeletingTrack = (state:RootState) => state.tracks.deletingTrack;
export const selectPublishingTrack = (state:RootState) => state.tracks.publishingTrack;
export const selectHistory = (state:RootState) => state.tracks.history;
export const selectHistoryLoading = (state:RootState) => state.tracks.historyLoading;
export const selectTracksFetching = (state:RootState) => state.tracks.tracksFetching;