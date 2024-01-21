import React from 'react';

import { EmptyState, Listing } from '@/components';

import { getCurrentUser, getListingById, getReservations } from '@/lib/actions';

// import { NextResponse } from 'next/server';

interface IParams {
  params: { listingId: string };
}

const Page = async ({ params }: IParams) => {
  const currentUser = await getCurrentUser();

  console.log('Listing Id: ', params.listingId);
  const listing = await getListingById({ listingId: params.listingId });

  if (!listing) {
    return <EmptyState />;
  }

  console.log('listing is: ', listing);

  const stringifyUser = currentUser ? JSON.stringify(currentUser) : '';
  const reservations = await getReservations({ listingId: listing._id });

  return (
    <div>
      {/* @ts-ignore */}
      <Listing
        currentUser={stringifyUser}
        listing={JSON.stringify(listing)}
        reservations={JSON.stringify(reservations)}
      />
    </div>
  );
};

export default Page;

export const dynamic = 'force-dynamic';
