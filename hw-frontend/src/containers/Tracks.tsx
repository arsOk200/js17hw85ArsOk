import React, {useEffect} from 'react';
import {useAppDispatch} from "../app/hooks";
import {useParams} from "react-router-dom";

const Tracks:React.FC = () => {
  const dispatch  = useAppDispatch();
  const {id} = useParams() as { id: string };

  useEffect(() => {

  },[dispatch])

  return (
    <div>
      tracks
    </div>
  );
};

export default Tracks;