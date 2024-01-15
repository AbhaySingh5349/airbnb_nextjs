import React from 'react';

import { Navbar, RegisterModal, LoginModal } from '@/components';
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
      <Navbar currentUser={JSON.stringify(currentUser)} />
      <ToasterProvider />
      Layout in Home
    </main>
  );
};

export default Layout;
