import { EmptyState, Trips } from '@/components';

import { getCurrentUser, getReservations } from '@/lib/actions';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser._id });
  console.log('MY TRIPS: ', reservations);

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips."
      />
    );
  }

  return (
    <Trips
      reservations={JSON.stringify(reservations)}
      currentUser={JSON.stringify(currentUser)}
    />
  );
};

export default TripsPage;

export const dynamic = 'force-dynamic';
