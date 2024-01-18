'use server';

import { NextResponse } from 'next/server';

import { connectToDB } from '../mongoose';
import { User, Listing } from '@/database';

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
    // return listings;

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (err: any) {
    console.log('error in get listings: ', err);
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
