'use server';

import { NextResponse } from 'next/server';

import { connectToDB } from '../mongoose';
import { User, Listing, Reservation } from '@/database';

export const addListing = async (params: any) => {
  try {
    await connectToDB();

    console.log('INSIDE listing');

    const {
      userId,
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = params;

    console.log('PARAMS: ', params);

    Object.keys(params).forEach((value: any) => {
      if (!params[value]) {
        NextResponse.error();
      }
    });

    const listing = await Listing.create({
      userId,
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    });

    // revalidatePath(path); // gives new data that was submitted (automatic refresh of path we are redirecting to)

    return listing;
  } catch (err: any) {
    console.log('listing err: ', err);
    return new NextResponse(err, { status: 500 });
  }
};

// export interface IListingsParams {
//   userId?: string;
//   guestCount?: number;
//   roomCount?: number;
//   bathroomCount?: number;
//   startDate?: string;
//   endDate?: string;
//   locationValue?: string;
//   category?: string;
// }

// export async function getListings(params: IListingsParams) {
//   try {
//     const {
//       userId,
//       roomCount,
//       guestCount,
//       bathroomCount,
//       locationValue,
//       startDate,
//       endDate,
//       category,
//     } = params;

//     // eslint-disable-next-line prefer-const
//     let query: any = {};

//     if (userId) {
//       query.userId = userId;
//     }

//     if (category) {
//       query.category = category;
//     }

//     if (roomCount) {
//       query.roomCount = {
//         gte: +roomCount,
//       };
//     }

//     if (guestCount) {
//       query.guestCount = {
//         gte: +guestCount,
//       };
//     }

//     if (bathroomCount) {
//       query.bathroomCount = {
//         gte: +bathroomCount,
//       };
//     }

//     if (locationValue) {
//       query.locationValue = locationValue;
//     }

//     if (startDate && endDate) {
//       const filterReservations = {
//         $or: [
//           {
//             'reservations.endDate': { $gte: startDate },
//             'reservations.startDate': { $lte: startDate },
//           },
//           {
//             'reservations.startDate': { $lte: endDate },
//             'reservations.endDate': { $gte: endDate },
//           },
//         ],
//       };

//       query.reservations = {
//         $not: {
//           $elemMatch: filterReservations,
//         },
//       };
//     }

//     const listings = await Listing.find(query).sort({ createdAt: -1 });

//     const safeListings = listings.map((listing) => ({
//       ...listing,
//       createdAt: listing.createdAt.toISOString(),
//     }));

//     return safeListings;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }

export const getListings = async () => {
  try {
    await connectToDB();

    const listings = await Listing.find({});
    return listings;
  } catch (err: any) {
    console.log('error in get listings: ', err);
    throw new Error(err);
  }
};

export const getListingById = async (params: any) => {
  try {
    await connectToDB();

    const { listingId } = params;

    if (!listingId) throw new Error('Invalid Listing Id to fetch');

    console.log('listingId: ', listingId);
    const listing = await Listing.findById(listingId);

    return listing;
  } catch (err: any) {
    console.log('error in get listing  by id: ', err);
    throw new Error(err);
  }
};

export const addListingToFavourite = async (params: any) => {
  try {
    await connectToDB();

    const { currentUser, listingId } = params;

    if (!listingId) throw new Error('Invalid Listing Id to add in Favourites');

    const favouritePlaces = [...(currentUser.favouritePlaces || []), listingId];

    console.log('IN addListingToFavourite: ', favouritePlaces);

    const user = User.findByIdAndUpdate(
      currentUser._id,
      {
        $set: { favouritePlaces },
      },
      { new: true }
    );

    return user;
  } catch (err: any) {
    console.log('error in adding listing to favourites: ', err);
    throw new Error(err);
  }
};

export const removeListingFromFavourite = async (params: any) => {
  try {
    await connectToDB();

    const { currentUser, listingId } = params;

    if (!listingId) throw new Error('Invalid Listing Id to add in Favourites');

    const favouritePlaces = [...(currentUser.favouritePlaces || [])].filter(
      (id) => id !== listingId
    );

    console.log('IN removeListingFromFavourite: ', favouritePlaces);

    const user = User.findByIdAndUpdate(
      currentUser._id,
      {
        $set: { favouritePlaces },
      },
      { new: true }
    );

    return user;
  } catch (err: any) {
    console.log('error in adding listing to favourites: ', err);
    throw new Error(err);
  }
};

export const createReservation = async (params: any) => {
  try {
    await connectToDB();

    const { userId, listingId, startDate, endDate, totalPrice } = params;

    if (!listingId) throw new Error('Invalid Listing Id to create reservation');

    const reservation = await Reservation.create({
      userId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });

    await Listing.findByIdAndUpdate(
      listingId,
      { $push: { reservations: reservation._id } },
      { new: true }
    );

    return reservation;
  } catch (err: any) {
    console.log('error in adding listing to favourites: ', err);
    throw new Error(err);
  }
};

export const deleteReservation = async (params: any) => {
  try {
    await connectToDB();

    const { reservationId } = params;

    if (!reservationId)
      throw new Error('Invalid Reservation Id to create delete');

    const reservation = await Reservation.findById(reservationId);

    await Reservation.deleteOne({ _id: reservationId });

    await Listing.findByIdAndUpdate(
      reservation.listingId,
      { $pull: { reservations: reservationId } },
      { new: true }
    );
  } catch (err: any) {
    console.log('error in adding listing to favourites: ', err);
    throw new Error(err);
  }
};

interface GetReservationsParams {
  listingId?: string;
  userId?: string;
  ownerId?: string;
}

export async function getReservations(params: GetReservationsParams) {
  try {
    const { listingId, userId, ownerId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    const reservations = await Reservation.find(query)
      .sort({ createdAt: -1 })
      .populate({
        path: 'listingId',
        model: Listing,
        ...(ownerId ? { match: { userId: ownerId } } : {}),
      });

    // return reservations;
    const filteredReservations = reservations.filter(
      (reservation) => reservation.listingId !== null
    );

    return filteredReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
