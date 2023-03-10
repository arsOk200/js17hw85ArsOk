import crypto from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
  mongoose.set("strictQuery",false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('trackhistories');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const Eminem = await Artist.create({
    name: "Eminem",
    description: "Raper",
    image:"fixtures/Eminem.jpeg",
    isPublished: true,
  })
  const Nirvana = await Artist.create({
    name: "Nirvana",
    description: "Band",
    image:"fixtures/Nirvana.jpeg",
    isPublished: true,
  });
  const TwentyOnePilots = await Artist.create({
    name: "Twenty One Pilots",
    description: "Band",
    image:"fixtures/TwentyOnePilots.jpg",
    isPublished: true,
  });




 const TheEminemShow = await Album.create({
    artist: Eminem._id,
    name:"The Eminem Show",
    image: "fixtures/EminemShow.jpg",
   year: 2002
  });
 const TheMarshallMathersLP = await Album.create({
   artist: Eminem._id,
   name:"The Marshall Mathers LP",
   image: "fixtures/TheMarshallMathersLP.jpg",
   year: 2000
 })


  const NeverMind = await Album.create({
   artist: Nirvana._id,
   name:"NeverMind",
   image: "fixtures/Nevermind.jpg",
    year: 1991,
    isPublished:false,

  });
  const InUtero = await Album.create({
    artist: Nirvana._id,
    name:"In Utero",
    image: "fixtures/InUtero.jpg",
    year: 1993,
    isPublished:false,
  });


  const BlurryFace = await Album.create({
   artist: TwentyOnePilots._id,
   name:"BlurryFace",
   image: "fixtures/BlurryFace.jpg",
    year: 2015,
    isPublished:false
 });
  const Trench = await Album.create({
    artist: TwentyOnePilots._id,
    name:"BlurryFace",
    image: "fixtures/Trench.jpg",
    year: 2018,
    isPublished:false,
  });

 await Track.create({
   name:"Say What You Say",
   duration: '5:12',
   album: TheEminemShow._id,
   number: 1,

    },{
   name:"Till I Collapse",
   duration: '4:58',
   album: TheEminemShow._id,
   number:2
 },{
   name:"Superman",
   duration: '5:50',
   album: TheEminemShow._id,
   number:3
 },{
   name:"Sing for the moment",
   duration: '5:40',
   album: TheEminemShow._id,
   number:4
 },{
   name:"Say Goodbye Hollywood",
   duration: '4:33',
   album: TheEminemShow._id,
   number:5
 },
   {
     name:"Bitch Please II",
     duration: '4:48',
     album: TheMarshallMathersLP._id,
     number: 1,
   },{
     name:"Amityville",
     duration: '4:15',
     album: TheMarshallMathersLP._id,
     number:2
   },{
     name:"The Way I Am",
     duration: '4:50',
     album: TheMarshallMathersLP._id,
     number:3
   },{
     name:"I'm Back",
     duration: '5:10',
     album: TheMarshallMathersLP._id,
     number:4
   },{
     name:"Stan",
     duration: '6:44',
     album: TheMarshallMathersLP._id,
     number:5
   },

   {
     name:"On a Plain",
     duration: '3:16',
     album: NeverMind._id,
     number: 1,
   },{
     name:"In Bloom",
     duration: '4:15',
     album: NeverMind._id,
     number:2
   },{
     name:"Come as You Are",
     duration: '3:39',
     album: NeverMind._id,
     number:3
   },{
     name:"Something in the Way",
     duration: '3:52',
     album: NeverMind._id,
     number:4
   },{
     name:"Smells Like Teen Spirit",
     duration: '5:01',
     album: NeverMind._id,
     number:5
   },
   {
     name:"Heart-Shaped Box",
     duration: '4:41',
     album: InUtero._id,
     number: 1,
   },{
     name:"All Apologies",
     duration: '3:51',
     album: InUtero._id,
     number:2
   },{
     name:"Come as You Are",
     duration: '3:39',
     album: InUtero._id,
     number:3
   },{
     name:"Milk It",
     duration: '3:55',
     album: InUtero._id,
     number:4
   },{
     name:"Rape Me",
     duration: '2:50',
     album: InUtero._id,
     number:5
   },

   {
     name:"Fairly Local",
     duration: '3:27',
     album: BlurryFace._id,
     number: 1,
   },{
     name:"Lane Boy",
     duration: '4:13',
     album: BlurryFace._id,
     number:2
   },{
     name:"Stressed Out",
     duration: '3:22',
     album: BlurryFace._id,
     number:3
   },{
     name:"Not Today",
     duration: '3:58',
     album: BlurryFace._id,
     number:4
   },{
     name:"Polarize",
     duration: '3:47',
     album: BlurryFace._id,
     number:5
   },
   {
     name:"Chlorine",
     duration: '5:25',
     album: Trench._id,
     number: 1,
   },{
     name:"Cut My Lip",
     duration: '4:43',
     album: Trench._id,
     number:2
   },{
     name:"The Hype",
     duration: '4:25',
     album: Trench._id,
     number:3
   },{
     name:"Bandito",
     duration: '5:31',
     album: Trench._id,
     number:4
   },{
     name:"Leave the City",
     duration: '4:41',
     album: Trench._id,
     number:5
   },)

  await User.create({
    username: "user",
    email: "user@shop.com",
    password: "1@345qWert",
    token: crypto.randomUUID()
  });

  await db.close();
};

void run();