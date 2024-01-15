'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Container, CategoryBox } from '../index';

import { categories } from '@/constants';

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category'); // extract category query from param

  const pathname = usePathname();
  const isMainPage = pathname === '/';

  // since we only want to show all categories only on index page
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          flex
          flex-row 
          items-center 
          justify-between 
          overflow-x-auto
          pt-4
        "
      >
        {/* (Immediately Invoked Function Expression) */}
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
