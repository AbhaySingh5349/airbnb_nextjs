import { Schema, models, model } from 'mongoose';

import { ReservationInterface } from './shared.types';

const ReservationSchema = new Schema<ReservationInterface>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  listingId: { type: Schema.Types.ObjectId, ref: 'Listing' },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// check if model already exists, else we create new
const Reservation =
  models.Reservation || model('Reservation', ReservationSchema);

export { Reservation };
