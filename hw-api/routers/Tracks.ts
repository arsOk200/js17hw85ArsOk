import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";
import Album from "../models/Album";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import User from "../models/User";

const TracksRouter = express.Router();

TracksRouter.get('/', async (req, res) => {
  if (req.query.album) {
    try {
      const token = req.get('Authorization');
      const user = await User.findOne({token});
      if (user) {
        if (user.role === 'admin') {
          const tracks = await Track.find({album: req.query.album}).sort({number: 1});
          if (!tracks) {
            return res.sendStatus(404);
          }
          return res.send(tracks);
        }
      }
      const tracks = await Track.find({album: req.query.album, isPublished: true}).sort({number: 1});
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

TracksRouter.post('/', auth, async (req, res, next) => {
  try {
    const track = await Track.create({
      name: req.body.name, duration: req.body.duration, album: req.body.album, number: parseInt(req.body.number),
    });
    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

TracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const track = await Track.deleteOne({_id: req.params.id});
    return res.send(track);
  } catch (e) {
    console.log(e);
    return next(e);
  }
});

TracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const track = await Track.findOne({_id: req.params.id});
    if (track) {
      const upTrack = await Track.findOneAndUpdate({_id: req.params.id}, {isPublished: !track.isPublished})
      return res.send(upTrack);
    } else {
      return res.status(404).send({'message': 'not found'});
    }
  } catch (e) {
    console.log(e);
    return next(e);
  }
});


export default TracksRouter;