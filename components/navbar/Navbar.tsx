import React from 'react';

import { Container, Logo, Search, UserMenu } from '@/components';
// import { UserInterface } from '../../database/shared.types';

interface NavbarProps {
  currentUser?: string | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  console.log('Current user in Navbar: ', JSON.parse(currentUser || ''));
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
