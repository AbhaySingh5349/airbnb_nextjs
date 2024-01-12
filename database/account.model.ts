import { Schema, models, model } from 'mongoose';

import { AccountInterface } from './shared.types';

const AccountSchema = new Schema<AccountInterface>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  refreshToken: { type: String },
  accessToken: { type: String },
  expiresAt: { type: Number },
  tokenType: { type: String },
  scope: { type: String },
  tokenId: { type: String },
  sessionState: { type: String },
});

// Creating a compound index for "provider" and "providerAccountId" with unique constraint
AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

// check if model already exists, else we create new
const Account = models.Account || model('Account', AccountSchema);

export { Account };
