import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist, ArtistMutation} from "../../types";
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
 );

export const createArtist = createAsyncThunk<void, ArtistMutation>(
  'artists/create',
  async (artistMutation) => {
    const formData = new FormData();
    const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];
    keys.forEach((key) => {
      const value = artistMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/artists', formData);

  }
);

export const PublishArtist = createAsyncThunk<void ,string>(
  'artist/publish',
  async (id) => {
    await axiosApi.patch( '/artists/'+id+ '/togglePublished')
  }
)