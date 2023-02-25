import {createAsyncThunk} from "@reduxjs/toolkit";
import {Track} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchTracks = createAsyncThunk<Track[],string>(
  'tracks/fetchAllTracks',
  async (id) => {
    const response = await axiosApi.get('/tracks/?album='+id);
    const tracks = response.data;
    if(!tracks) {
      return [];
    }
    return tracks;
  }
)