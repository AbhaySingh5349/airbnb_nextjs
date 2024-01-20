'use client';

import { FormHeading, ListingCard, Container } from '@/components';

interface PropertiesProps {
  properties: string;
  currentUser?: string | null;
}

const Properties = ({ properties, currentUser }: PropertiesProps) => {
  const parsedProperties = properties && JSON.parse(properties || '');
  console.log('parsedProperties: ', parsedProperties);

  return (
    <Container>
      <FormHeading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {parsedProperties.map((property: any) => (
          <ListingCard
            key={property._id}
            listing={JSON.stringify(property)}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Properties;
