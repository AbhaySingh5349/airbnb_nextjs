import React from 'react';

import { getCurrentUser, addListingToFavourite } from '@/lib/actions';

import { NextResponse } from 'next/server';

interface IParams {
  listingId?: string;
}

const Page = async ({ listingId }: IParams) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  console.log('Listing Id: ', listingId);

  const updatedUser = await addListingToFavourite({
    currentUser,
    listingId,
  });
  console.log('updatedUser in add new listing: ', updatedUser);

  return <div>Favourites by Id Page</div>;
};

export default Page;
