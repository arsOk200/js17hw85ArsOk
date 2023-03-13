import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import User from "../models/User";
import Track from "../models/Track";

const AlbumsRouter = express.Router();

AlbumsRouter.get('/', async (req, res) => {
  if (req.query.album) {
    try {
      const album = await Album.findOne({_id: req.query.album}).populate('artist', 'image year name');
      if (!album) {
        return res.sendStatus(404);
      }
      return res.send(album);
    } catch {
      return res.sendStatus(500);
    }
  } else if (!req.query.album) {
    try {
      const albums = await Album.find();
      return res.send(albums);
    } catch {
      return res.sendStatus(500);
    }
  }
});

AlbumsRouter.get('/:id', async (req, res) => {
  try {
    const token = req.get('Authorization');
    const user = await User.findOne({token});
    if (user) {
      if (user.role === 'admin') {
        const album = await Album.find({artist: req.params.id}).sort({year: -1}).populate('artist', 'name');
        return res.send(album);
      }
    }
    const album = await Album.find({
      artist: req.params.id,
      isPublished: true
    }).sort({year: -1}).populate('artist', 'name');
    return res.send(album);
  } catch {
    return res.sendStatus(500);
  }

});

AlbumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const album = await Album.create({
      name: req.body.name,
      artist: req.body.artist,
      image: req.file ? req.file.filename : null,
      year: parseFloat(req.body.year),
    });
    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

AlbumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const album = await Album.deleteOne({_id: req.params.id});
    await Track.deleteMany({album: req.params.id});
    return res.send(album);
  } catch (e) {
    console.log(e);
    return next(e);
  }
});
AlbumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const album = await Album.findOne({_id: req.params.id});
    if (album) {
      const upAlbum = await Album.findOneAndUpdate({_id: req.params.id}, {isPublished: !album.isPublished})
      return res.send(upAlbum);
    } else {
      return res.status(404).send({'message': 'not found'});
    }
  } catch (e) {
    console.log(e);
    return next(e);
  }
});


export default AlbumsRouter;


