import { FormHeading, ListingCard, Container } from '@/components';

interface FavouritesProps {
  listings: string;
  currentUser?: string | null;
}

const Favourites = ({ listings, currentUser }: FavouritesProps) => {
  const parsedListings = listings && JSON.parse(listings || '');
  return (
    <Container>
      <FormHeading title="Favorites" subtitle="List of places you favorited!" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {parsedListings.map((listing: any) => (
          <ListingCard
            key={listing._id}
            currentUser={currentUser}
            listing={JSON.stringify(listing)}
          />
        ))}
      </div>
    </Container>
  );
};

export default Favourites;
