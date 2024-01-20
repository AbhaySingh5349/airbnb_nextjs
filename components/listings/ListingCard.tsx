/* eslint-disable no-unused-vars */
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { format } from 'date-fns';

import { HeartButton, Button } from '@/components';

interface ListingCardProps {
  listing: string; //  SafeListing
  reservation?: string | null;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: string | null;
}

const ListingCard = ({
  listing,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}: ListingCardProps) => {
  const router = useRouter();

  const parsedListing = listing && JSON.parse(listing || '');
  console.log('parsedListing in ListingCard.tsx: ', parsedListing); // imageSrc
  console.log('ID: ', parsedListing?._id);

  const parsedReservation = reservation && JSON.parse(reservation || '');

  const parsedLocation =
    parsedListing?.location && JSON.parse(parsedListing?.location);
  console.log('parsedLocation: ', parsedLocation);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (parsedReservation) {
      return parsedReservation.totalPrice;
    }

    return parsedListing?.price;
  }, [parsedReservation, parsedListing?.price]);

  const reservationDate = useMemo(() => {
    if (!parsedReservation) {
      return null;
    }

    const start = new Date(parsedReservation.startDate);
    const end = new Date(parsedReservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [parsedReservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${parsedListing?._id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            fill
            className="h-full w-full object-cover transition group-hover:scale-110"
            src={parsedListing?.imageSrc}
            alt="Listing"
          />
          <div className="absolute right-3 top-3">
            <HeartButton
              listingId={parsedListing?._id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="text-lg font-semibold">
          {parsedLocation?.region}, {parsedLocation?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || parsedListing?.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
