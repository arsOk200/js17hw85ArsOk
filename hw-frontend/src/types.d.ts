export interface Artist{
  name:string;
  description:string;
  image:string;
  _id:string;
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

export interface User {
  _id:string;
  username:string;
  token:string;
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