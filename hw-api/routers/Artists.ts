import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";



const ArtistsRouter = express.Router();

ArtistsRouter.get('/', async (req, res) => {
  try {
      const artists = await Artist.find();
      return res.send(artists);
  } catch {
    return res.sendStatus(500);
  }
});
ArtistsRouter.post('/',auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
  const artist = await Artist.create({
    name: req.body.name,
    description: req.body.description,
    image: req.file ? req.file.filename : null,
  });

    return res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

ArtistsRouter.delete('/:id',auth,permit('admin'), async (req,res,next) => {
  try{
    const artist = await Artist.deleteOne({_id:req.params.id});
    return res.send(artist);
  }catch (e){
    console.log(e);
    return next(e);
  }
});

ArtistsRouter.patch('/:id/togglePublished',auth,permit('admin') ,async (req,res,next) => {
  try {
    const artist = await Artist.findOne({_id:req.params.id});
    if(artist) {
      const upArtist = await Artist.findOneAndUpdate({_id:req.params.id},{isPublished:!artist.isPublished})
      return  res.send(upArtist);
    } else {
      return res.status(404).send({'message':'not found'});
    }
  }catch (e){
    console.log(e);
    return next(e);
  }
});


export default ArtistsRouter;