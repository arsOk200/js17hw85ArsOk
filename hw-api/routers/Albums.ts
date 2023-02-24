import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import {AlbumMutation} from "../types";
import mongoose from "mongoose";


const AlbumsRouter = express.Router();

AlbumsRouter.get('/', async (req, res) => {
  if (req.query.artist) {
    try {
      const album = await Album.find({artist: req.query.artist});
      if (!album) {
        return res.sendStatus(404);
      }
      return res.send(album);
    } catch {
      return res.sendStatus(500);
    }
  } else if (!req.query.artist) {
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
    const album = await Album.findById(req.params.id).populate('artist', 'name description');
    return res.send(album);
  } catch {
    return res.sendStatus(500);
  }

});

AlbumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  const albumData: AlbumMutation = {
    name: req.body.name, artist: req.body.artist, image: req.body.image, year: parseFloat(req.body.year),
  };
  const album = new Album(albumData);
  try {
    await album.save();
    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});


export default AlbumsRouter;

