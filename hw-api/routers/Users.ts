import express from "express";
import mongoose from "mongoose";
import User from "../models/User";
import {OAuth2Client} from "google-auth-library";
import config from "../config";
import * as crypto from "crypto";

const UsersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

UsersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username, password: req.body.password,
    });
    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});
UsersRouter.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});
  if (!user) {
    return res.status(400).send({error: 'Username not found'});
  }
  const isMatch = await user.checkPassword(req.body.password);
  if (!isMatch) {
    return res.status(400).send({error: 'Password is wrong'});
  }
  user.generateToken();
  await user.save();
  return res.send({message: 'Username and password correct!', user});
});



UsersRouter.post("/google", async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send({ error: "Google login error!" });
    }
    const email = payload["email"];
    const googleId = payload["sub"];
    const displayName = payload["name"];
    const avatar = payload["picture"];
    if (!email) {
      return res.status(400).send({ error: "Not enough user data to continue" });
    }
    let user = await User.findOne({ googleId: googleId });
    if (!user) {
      user = new User({
        username:email,
        password: crypto.randomUUID(),
        googleId: googleId,
        displayName:displayName,
        avatar:avatar,
      })
    }
    user.generateToken();
    await user.save();
    return res.send({ message: "Login with Google successful!", user });
  } catch (e) {
    return next(e);
  }
});


UsersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = {message: 'ok'};
    if (!token) {
      return res.send(success);
    }
    const user = await User.findOne({token});
    if (!user) {
      return res.send(success);
    }
    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (e) {
    return next(e)
  }
});

export default UsersRouter;