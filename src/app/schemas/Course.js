import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema (
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
    stars: {
      type: Number,
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
