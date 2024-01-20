'use client';

import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { FormHeading, ListingCard, Container } from '@/components';

import { deleteReservation } from '@/lib/actions';

interface ReservationsProps {
  reservations: string;
  currentUser?: string | null;
}

const Reservations = ({ reservations, currentUser }: ReservationsProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const parsedReservations = reservations && JSON.parse(reservations || '');
  console.log('parsedReservations: ', parsedReservations);

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await deleteReservation({ reservationId: id });
        toast.success('Reservation cancelled by owner');
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
        title="Reservations"
        subtitle="Bookings on your properties"
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
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Reservations;
