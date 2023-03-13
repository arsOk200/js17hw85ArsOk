import {createAsyncThunk} from "@reduxjs/toolkit";
import {Track, TrackHistory, TrackMutation} from "../../types";
import axiosApi from "../../axiosApi";



export const fetchTracks = createAsyncThunk<Track[],string>(
  'tracks/fetchAllTracks',
  async (id) => {
    const response = await axiosApi.get<Track[] | null>('/tracks/?album='+id);
    const tracks = response.data;
    if(!tracks) {
      return [];
    }
    return tracks;
  }
);

export const fetchTrackHistory = createAsyncThunk<TrackHistory[]>(
  'tracks/history',
    async () => {
        const response = await axiosApi.get<TrackHistory[]>('/trackHistory');
        const tracks = response.data;
        if(!tracks) {
          return [];
        }
        return tracks;

    }
)

export const addTrackToHistory = createAsyncThunk<void, string>(
  'tracks/addToHistory',
  async (id)=> {
      await axiosApi.post('/trackHistory',{track:id});
  }
);


export const createTrack = createAsyncThunk<void, TrackMutation>(
  'tracks/create',
  async (track) => {
        await axiosApi.post('/tracks', track);
    }
);

export const DeleteTrack = createAsyncThunk<void ,string>(
  'tracks/delete',
  async (id) => {
    await axiosApi.delete( '/tracks/'+id)
  }
);


export const PublishTrack = createAsyncThunk<void ,string>(
  'tracks/publish',
  async (id) => {
    await axiosApi.patch( '/tracks/'+id+ '/togglePublished')
  }
);