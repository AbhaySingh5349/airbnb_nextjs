'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { eachDayOfInterval, differenceInDays } from 'date-fns';
import { Range } from 'react-date-range';

import { categories } from '@/constants';

import {
  Container,
  ListingHead,
  ListingInfo,
  ListingReservation,
} from '@/components';

import { useLoginModal } from '@/hooks';

import { createReservation } from '@/lib/actions';
import toast from 'react-hot-toast';

interface IParams {
  currentUser: string;
  listing: string;
  reservations?: string;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

const Listing = ({ currentUser, listing, reservations }: IParams) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const parsedListing = listing && JSON.parse(listing || '');
  const listingCategory = parsedListing?.category;

  const category = useMemo(() => {
    return categories.find((item: any) => item.label === listingCategory);
  }, [listingCategory]);

  const parsedCurrentUser = currentUser && JSON.parse(currentUser || '');
  const parsedReservations = reservations && JSON.parse(reservations || '');

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    parsedReservations.forEach((reservation: any) => {
      console.log('Individual Reservation: ', reservation);
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [parsedReservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(parsedListing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    try {
      await createReservation({
        userId: parsedCurrentUser._id,
        listingId: parsedListing._id,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalPrice,
      });

      toast.success('Listing reserved!');
      setDateRange(initialDateRange);
      setIsLoading(false);
      router.push('/trips');
    } catch (err) {
      toast.error('Something went wrong while creating reservation');
      setIsLoading(false);
    }
  }, [
    totalPrice,
    dateRange,
    parsedListing?._id,
    router,
    parsedCurrentUser._id,
    currentUser,
    loginModal,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && parsedListing.price) {
        setTotalPrice(dayCount * parsedListing.price);
      } else {
        setTotalPrice(parsedListing.price);
      }
    }
  }, [dateRange, parsedListing.price]);

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
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={parsedListing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Listing;
