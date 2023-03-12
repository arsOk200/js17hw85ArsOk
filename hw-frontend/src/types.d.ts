export interface Artist{
  name:string;
  description:string;
  image:string;
  _id:string;
  isPublished:boolean;
}
export interface Album{
  year:number;
  image:string;
  name:string;
  _id:string;
  artist:{
    name:string
  }
}
export interface Track{
  name:string;
  number:number;
  duration:string;
  _id:string;
}
export interface RegisterMutation{
  username:string;
  password:string;
}
export interface TrackHistory{
  _id:string;
  datetime:string;
  user:string;
  track:{
    name:string;
    duration:string;
  };
}

export interface User {
  _id:string;
  username:string;
  token:string;
  role:string;
}
export interface RegisterResponse {
  message:string;
  user:User;
}

export interface ValidationError {
  errors:{
    [key:string]:{
      name:string;
      message:string;
    }
  }
  message:string;
  name:string;
}

export interface LoginMutation{
  username:string;
  password:string;
}

export interface GlobalError{
  error:string;
}
export interface ArtistMutation{
  description:string;
  name:string;
  image:File | null;
}
export interface AlbumMutation{
  name:string;
  artist: string,
  image: File | null,
  year: string,
}
export interface TrackMutation{
  name:string;
  duration:string;
  album:string;
  number:string;
}