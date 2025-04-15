import mongoose, { Schema, model } from 'mongoose';

const videoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  videoUrl: String,
  thumbnailUrl: String,
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: String,
    enum: ['sub1', 'sub2', 'sub3', 'sub4'],
  },
  program: {
    type: String,
  },
  branch: {
    type: String,
  },
  semester: {
    type: String,
  },
  subject: {
    type: String,
  },
  duration: String,
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
        type: Schema.Types.ObjectId,
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

const Video = model('Video', videoSchema);

export default Video;
