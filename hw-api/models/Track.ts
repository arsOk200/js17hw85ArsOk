import  mongoose ,{Types} from "mongoose";
import Album from "./Album";
const Schema = mongoose.Schema

const TrackSchema = new Schema({
  album:{
    type:Schema.Types.ObjectId,
    ref:'Album',
    required:true,
    validate:{
      validator:async (value:Types.ObjectId) => Album.findById(value).populate('artist'),
      message:'album does not exist'
    },
  },
  name:{
    type:String,
    required:true
  },
  duration:{
    type:String,
    required: true
  },
  number:{
    type:Number,
    required:true,
  },
  isPublished:{
    type:Boolean,
    required:true,
    default:false,
  },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;