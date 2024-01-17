'use server';

import { NextResponse } from 'next/server';

import { connectToDB } from '../mongoose';
import { Listing } from '@/database';

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
