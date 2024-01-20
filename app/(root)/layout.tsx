import React from 'react';

import {
  Navbar,
  RegisterModal,
  LoginModal,
  RentModal,
  SearchModal,
} from '@/components';
import { ToasterProvider } from '@/providers';
import { getCurrentUser } from '@/lib/actions';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  console.log('user in layout: ', currentUser);
  return (
    <main>
      {/* <Modal actionLabel="Default Label" title="Hello World" isOpen /> */}
      <RegisterModal />
      <LoginModal />
      <SearchModal />
      <RentModal currentUser={JSON.stringify(currentUser)} />
      <Navbar currentUser={JSON.stringify(currentUser)} />
      <ToasterProvider />
      <div className="pb-20 pt-28">{children}</div>
    </main>
  );
};

export default Layout;
