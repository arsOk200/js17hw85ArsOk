export interface ArtistMutation {
  name: string;
  image: string;
  description: string;
}

export interface AlbumMutation {
  name: string;
  image: string;
  year: number;
  artist: string;
}

export interface TrackMutation {
  name: string;
  album: string;
  duration: string;
  number:number;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
}