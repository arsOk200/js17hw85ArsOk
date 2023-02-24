import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchAlbums = createAsyncThunk<Album[],string>(
  'albums/fetchAllAlbums',
  async (id) => {
      const response = await axiosApi.get<Album[] | null>('/albums/'+id);
      const albums = response.data
      if(!albums) {
        return [];
      }
      return albums;
  }
)