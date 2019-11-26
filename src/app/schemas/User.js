import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teacher: {
      type: Boolean,
      default: false,
    },
    avatar_url: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async next => {
  console.log(await this.email);

  next();
});

export default mongoose.model('User', UserSchema);
