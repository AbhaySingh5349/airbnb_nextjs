import React from 'react';

import { Container, EmptyState, ListingCard } from '@/components';

import { getCurrentUser, getListings } from '@/lib/actions';

interface HomeParams {
  searchParams: {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    location?: string;
    category?: string;
  };
}

const Page = async ({ searchParams }: HomeParams) => {
  const currentUser = await getCurrentUser();

  console.log('HOME PARAMS: ', searchParams);
  const listings = await getListings(searchParams);

  if (!listings) {
    return <EmptyState />;
  }

  return (
    <>
      <Container>
        <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((listing: any) => (
            <ListingCard
              key={listing._id}
              listing={JSON.stringify(listing)}
              currentUser={JSON.stringify(currentUser)}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Page;
