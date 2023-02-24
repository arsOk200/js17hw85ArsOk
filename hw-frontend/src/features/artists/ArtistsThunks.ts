import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchAllArtists = createAsyncThunk<Artist[]>(
  'artists/fetchAll',
  async () => {
    try {
      const response = await axiosApi.get('/artists');
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
 )