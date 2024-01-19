'use client';

import React, { useMemo } from 'react';

import { categories } from '@/constants';

import { Container, ListingHead, ListingInfo } from '@/components';

import { useLoginModal } from '@/hooks';

interface IParams {
  currentUser: string;
  listing: string;
  reservations?: string[];
}

const Listing = ({ currentUser, listing, reservations = [] }: IParams) => {
  const loginModal = useLoginModal();

  const parsedListing = listing && JSON.parse(listing || '');
  const listingCategory = parsedListing?.category;

  const category = useMemo(() => {
    return categories.find((item: any) => item.label === listingCategory);
  }, [listingCategory]);

  if (!currentUser) {
    return loginModal.onOpen();
  }

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={parsedListing?.title}
            imageSrc={parsedListing?.imageSrc}
            location={parsedListing?.location}
            id={parsedListing?._id}
            currentUser={currentUser}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo
              userId={parsedListing.userId}
              category={category}
              description={parsedListing.description}
              roomCount={parsedListing.roomCount}
              guestCount={parsedListing.guestCount}
              bathroomCount={parsedListing.bathroomCount}
              location={parsedListing.location}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Listing;
