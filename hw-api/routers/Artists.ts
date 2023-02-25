import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistMutation} from "../types";
import mongoose from "mongoose";


const ArtistsRouter = express.Router();

ArtistsRouter.get('/', async (req, res) => {
  try {
      const artists = await Artist.find();
      return res.send(artists);
  } catch {
    return res.sendStatus(500);
  }
});
ArtistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  const artistData: ArtistMutation = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  };
  const artist = new Artist(artistData);
  try {
    await artist.save();
    return res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});


export default ArtistsRouter;