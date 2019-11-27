import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
  console.log(this.email);

  next();
});

export function checkPassword(password, password_hash) {
  return bcrypt.compare(password, password_hash);
}

export default mongoose.model('User', UserSchema);
