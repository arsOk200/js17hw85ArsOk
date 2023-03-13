import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album, AlbumMutation} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchAlbums = createAsyncThunk<Album[],string>(
  'albums/fetchAllAlbumsWithId',
  async (id) => {
      const response = await axiosApi.get<Album[] | null>('/albums/'+id);
      const albums = response.data
      if(!albums) {
        return [];
      }
      return albums;
  }
);

export const fetchAllAlbums = createAsyncThunk<Album[],void>(
  'albums/fetchAllAlbums',
  async () => {
    const response = await axiosApi.get<Album[] | null>('/albums/');
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
);

export const createAlbum = createAsyncThunk<void, AlbumMutation>(
  'albums/create',
  async (album) => {
    const formData = new FormData();
    const keys = Object.keys(album) as (keyof AlbumMutation)[];
    keys.forEach((key) => {
      const value = album[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post('/albums', formData);

  }
);

export const DeleteAlbum = createAsyncThunk<void ,string>(
  'album/delete',
  async (id) => {
    await axiosApi.delete( '/albums/'+id)
  }
);


export const PublishAlbum = createAsyncThunk<void ,string>(
  'album/publish',
  async (id) => {
    await axiosApi.patch( '/albums/'+id+ '/togglePublished')
  }
);