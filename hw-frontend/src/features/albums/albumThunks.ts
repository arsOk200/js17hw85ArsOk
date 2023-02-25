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
);

export const fetchOneAlbum = createAsyncThunk<Album,string> (
  'albums/fetchOneAlbum',
  async (id) => {
    const response = await axiosApi.get<Album | null>('/albums/?album='+id);
    const albums = response.data;
    if(albums === null) {
      throw new Error('not found');
    }
    return albums;
  }
)