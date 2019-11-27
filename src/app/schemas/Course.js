import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    teacher: {
      type: Object,
      required: true,
    },
    powered_by: {
      type: String,
    },
    powered_by_avatar: {
      type: String,
    },
    stars: {
      type: Number,
      default: 0,
    },
    students: {
      type: [Object],
    },
    posts: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Course', CourseSchema);
