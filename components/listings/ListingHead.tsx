'use client';

import Image from 'next/image';

import { FormHeading, HeartButton } from '@/components';

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  location: string;
  id: string;
  currentUser?: string;
}

const ListingHead = ({
  title,
  imageSrc,
  location,
  id,
  currentUser,
}: ListingHeadProps) => {
  const parsedLocation = location && JSON.parse(location);

  return (
    <>
      <FormHeading
        title={title}
        subtitle={`${parsedLocation?.region}, ${parsedLocation?.label}`}
      />
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          src={imageSrc}
          fill
          className="w-full object-cover"
          alt="Image"
        />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
