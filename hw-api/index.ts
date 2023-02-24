import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import AlbumsRouter from "./routers/Albums";
import ArtistsRouter from "./routers/Artists";
import TracksRouter from "./routers/Tracks";
import UsersRouter from "./routers/Users";
import Track_HistoryRouter from "./routers/track_history";

const app = express();
const port = 8005;

app.use(cors());
app.use(express.static('public'))
app.use(express.json());


app.use('/albums', AlbumsRouter);
app.use('/artists', ArtistsRouter);
app.use('/tracks', TracksRouter);
app.use('/users', UsersRouter);
app.use('/track_history', Track_HistoryRouter);

const run = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect('mongodb://localhost/music')
  app.listen(port, () => {
    console.log('we are live on ' + port);
  });
  process.on('exit', () => {
    mongoose.disconnect();
  })
};
run().catch(console.error);