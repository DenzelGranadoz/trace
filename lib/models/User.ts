import mongoose, { Schema } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    emailVerified: Boolean,
    password: { type: String, required: false },
    resetToken: String,
    resetTokenExpiry: Date,
    activateToken: String,
    activateTokenExpire: Date,
    activatedAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
