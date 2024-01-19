import React from 'react';

import { EmptyState, Listing } from '@/components';

import { getCurrentUser, getListingById } from '@/lib/actions';

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

  return (
    <div>
      {/* @ts-ignore */}
      <Listing currentUser={stringifyUser} listing={JSON.stringify(listing)} />
    </div>
  );
};

export default Page;
