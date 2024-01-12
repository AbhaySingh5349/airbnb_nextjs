import React from 'react';

import { Navbar, RegisterModal } from '@/components';
import { ToasterProvider } from '@/providers';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      {/* <Modal actionLabel="Default Label" title="Hello World" isOpen /> */}
      <RegisterModal />
      <Navbar />
      <ToasterProvider />
      Layout in Home
    </main>
  );
};

export default Layout;
