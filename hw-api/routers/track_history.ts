import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";

const Track_HistoryRouter = express.Router();

Track_HistoryRouter.post('/', async (req, res) => {
  const token = req.get('Authorization');
  if (!token) {
    return res.status(401).send({error: 'No token present'});
  }
  try {
    const user = await User.findOne({token});
    if (!user) {
      return res.status(401).send({error: 'Wrong token!'});
    }
    const track_history = new TrackHistory({
      user: user._id.toString(),
      track: req.body.track,
      datetime: new Date().toISOString(),
    })
    await track_history.save();
    res.send(track_history);
  } catch (e) {
    console.log(e);
  }
});

export default Track_HistoryRouter;