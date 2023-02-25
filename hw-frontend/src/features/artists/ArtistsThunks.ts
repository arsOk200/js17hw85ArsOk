import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchAllArtists = createAsyncThunk<Artist[]>(
  'artists/fetchAll',
  async () => {
    try {
      const response = await axiosApi.get('/artists');
      const artists = response.data
      if(!artists) {
        return [];
      }
      return artists;
    } catch (e) {
      console.log(e);
    }
  }
 )