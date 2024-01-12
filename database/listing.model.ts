import { Schema, models, model } from 'mongoose';

import { ListingInterface } from './shared.types';

const ListingSchema = new Schema<ListingInterface>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageSrc: { type: String, required: true },
  category: { type: String, required: true },
  roomCount: { type: Number, required: true },
  bathroomCount: { type: Number, required: true },
  guestCount: { type: Number, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }],
  createdAt: { type: Date, default: Date.now },
});

// check if model already exists, else we create new
const Listing = models.Listing || model('Listing', ListingSchema);

export { Listing };
