// d.ts file is used to provide TS type info

import { Schema, Document } from 'mongoose';

export interface UserInterface extends Document {
  username: string;
  email: string;
  password?: string;
  emailVerified?: Date;
  image?: string;
  favouritePlaces: Schema.Types.ObjectId[];
  listings: Schema.Types.ObjectId[];
  reservations: Schema.Types.ObjectId[];
  accounts: Schema.Types.ObjectId[];
  joinedAt: Date;
  updatedAt: Date;
}

export interface AccountInterface extends Document {
  userId: Schema.Types.ObjectId;
  type: string;
  provider: string;
  providerAccountId: string;
  refreshToken?: string;
  accessToken?: string;
  expiresAt?: number;
  tokenType?: string;
  scope?: string;
  tokenId?: string;
  sessionState?: string;
}

export interface ListingInterface extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  location: string;
  price: number;
  reservations: Schema.Types.ObjectId[];
  createdAt: Date;
}

export interface ReservationInterface extends Document {
  userId: Schema.Types.ObjectId;
  listingId: Schema.Types.ObjectId;
  description: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
}
