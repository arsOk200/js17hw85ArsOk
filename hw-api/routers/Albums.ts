import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";



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
    const album = await Album.find({artist: req.params.id}).sort({year:-1}).populate('artist', 'name');
    return res.send(album);
  } catch {
    return res.sendStatus(500);
  }

});

AlbumsRouter.post('/', auth,imagesUpload.single('image'), async (req, res, next) => {
  try {
  const album = await Album.create({
    name: req.body.name,
    artist: req.body.artist,
    image: req.body.image,
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

AlbumsRouter.delete('/:id',auth,permit('admin'), async (req,res,next) => {
  try{
    const album = await Album.deleteOne({_id:req.params.id});
    return res.send(album);
  }catch (e){
    return next(e);
  }
});


export default AlbumsRouter;


