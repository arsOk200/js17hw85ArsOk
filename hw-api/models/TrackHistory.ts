import mongoose, {Schema, Types} from "mongoose";
import User from "./User";
import Track from "./Track";

const TrackHistorySchema = new Schema({
  user: {
    type: String,
    ref:'User',
    required:true,
    validate:{
      validator:async (value:Types.ObjectId) => User.findById(value),
      message:'user does not exist'
    },
  },
  datetime: {
    type: Date, required: true,
  },
  track: {
    type: String, ref:'Track',
    required:true,
    validate:{
      validator:async (value:Types.ObjectId) => Track.findById(value),
      message:'track does not exist',
    },
  },
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);
export default TrackHistory;

