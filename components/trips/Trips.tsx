'use client';

import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { FormHeading, ListingCard, Container } from '@/components';

import { deleteReservation } from '@/lib/actions';

interface TripsProps {
  reservations: string;
  currentUser?: string | null;
}

const Trips = ({ reservations, currentUser }: TripsProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const parsedReservations = reservations && JSON.parse(reservations || '');
  console.log('parsedTrips: ', parsedReservations);

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await deleteReservation({ reservationId: id });
        toast.success('Reservation cancelled by customer');
        router.refresh();
        setDeletingId('');
      } catch (error: any) {
        setDeletingId('');
        toast.error(error?.response?.data?.error);
      }
    },
    [router]
  );

  return (
    <Container>
      <FormHeading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {parsedReservations.map((reservation: any) => (
          <ListingCard
            key={reservation._id}
            listing={JSON.stringify(reservation.listingId)}
            reservation={JSON.stringify(reservation)}
            actionId={reservation._id}
            onAction={onCancel}
            disabled={deletingId === reservation._id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Trips;
