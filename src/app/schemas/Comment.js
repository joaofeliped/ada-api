import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    content_url: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Comment', CommentSchema);
