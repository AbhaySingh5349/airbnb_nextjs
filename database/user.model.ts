import { Schema, models, model } from 'mongoose';

import { UserInterface } from './shared.types';

const UserSchema = new Schema<UserInterface>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // not exposing hashed password for any end-point other than /register (handled in code while token generation), for other we need to do: query.select('+password')
  password: { type: String, select: false },
  confirm_password: { type: String },
  joinedAt: { type: Date, default: Date.now },
});

// check if model already exists, else we create new
const User = models.User || model('User', UserSchema);

export { User };
