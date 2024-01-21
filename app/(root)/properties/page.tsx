import { EmptyState, Properties } from '@/components';

import { getCurrentUser, getMyProperties } from '@/lib/actions';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  // get bookings of other people on my listings
  const properties = await getMyProperties({ userId: currentUser._id });
  console.log('MY PROPERTIES: ', properties);

  if (properties.length === 0) {
    return (
      <EmptyState
        title="No Properties found"
        subtitle="Looks like you have no properties."
      />
    );
  }

  return (
    <Properties
      properties={JSON.stringify(properties)}
      currentUser={JSON.stringify(currentUser)}
    />
  );
};

export default PropertiesPage;
