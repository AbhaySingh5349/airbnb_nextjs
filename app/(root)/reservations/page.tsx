import { EmptyState, Reservations } from '@/components';

import { getCurrentUser, getReservations } from '@/lib/actions';

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  // get bookings of other people on my listings
  const reservations = await getReservations({ ownerId: currentUser._id });
  console.log('BOOKING TO MY LISTINGS: ', reservations);

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations for your properties found"
        subtitle="Looks like no one booked your listings."
      />
    );
  }

  return (
    <Reservations
      reservations={JSON.stringify(reservations)}
      currentUser={JSON.stringify(currentUser)}
    />
  );
};

export default ReservationsPage;

export const dynamic = 'force-dynamic';
