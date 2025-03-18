import { Schema, model } from 'mongoose'
import User from './user.model.js';

const videoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  uploader: {
    type: String, // from User model
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['sub1', 'sub2', 'sub3', 'sub4'],
    required: true,
  },
  duration: {
    type: Number, // time in seconds
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId, // from User model
        ref: 'User',
      },
      text: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Video = model('Video', videoSchema)

export default Video