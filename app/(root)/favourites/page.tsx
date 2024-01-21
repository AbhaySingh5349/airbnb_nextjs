import { EmptyState, Favourites } from '@/components';
import { getCurrentUser, getFavouriteListings } from '@/lib/actions';

const FavouritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getFavouriteListings({ currentUser });
  console.log('MY FAVOURITE LISTINGS: ', listings);

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favourite properties found"
        subtitle="Looks like you haven't marked any place as favourite."
      />
    );
  }

  return (
    <Favourites
      listings={JSON.stringify(listings)}
      currentUser={JSON.stringify(currentUser)}
    />
  );
};

export default FavouritesPage;

export const dynamic = 'force-dynamic';
