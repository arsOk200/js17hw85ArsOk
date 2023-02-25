import express from "express";
import Track from "../models/Track";
import {TrackMutation} from "../types";
import mongoose from "mongoose";

import Album from "../models/Album";


const TracksRouter = express.Router();

TracksRouter.get('/', async (req, res) => {
  if (req.query.album) {
    try {
      const tracks = await Track.find({album: req.query.album}).sort({number:1});
      if (!tracks) {
        return res.sendStatus(404);
      }
      return res.send(tracks);
    } catch {
      return res.sendStatus(500);
    }
  } else if (!req.query.album) {
    try {
      const tracks = await Track.find().populate('album', 'name year');
      return res.send(tracks);
    } catch {
      return res.sendStatus(500);
    }
  }
});

TracksRouter.get('/:id', async (req, res) => {
  try {
    const allAlbums = await Album.find({artist: req.params.id});
    if (!allAlbums) {
      return res.sendStatus(404);
    }
    let tracks = []
    for (let i = 0; i < allAlbums.length; i++) {
      const allTracks = await Track.find({album: allAlbums[i].id});
      tracks.push(allTracks);
    }
    return res.send(tracks);
  } catch {
    return res.sendStatus(500);
  }
});

TracksRouter.post('/', async (req, res, next) => {
  const trackData: TrackMutation = {
    name: req.body.name,
    duration: req.body.duration,
    album: req.body.album,
    number:parseInt(req.body.number),
  };
  const track = new Track(trackData);
  try {
    await track.save();
    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});


export default TracksRouter;