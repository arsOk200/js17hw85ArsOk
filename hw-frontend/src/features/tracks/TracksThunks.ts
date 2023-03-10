import {createAsyncThunk} from "@reduxjs/toolkit";
import {Track, TrackHistory} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";


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

export const addTrackToHistory = createAsyncThunk<void, string, {state:RootState}>(
  'tracks/addToHistory',
  async (id, {getState})=> {
    const user = getState().users.user;
    if(user) {
      await axiosApi.post('/trackHistory',{track:id}, {headers:{'Authorization':user.token}});
    }
  }
)