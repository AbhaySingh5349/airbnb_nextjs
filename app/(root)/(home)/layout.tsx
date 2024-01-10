import React from 'react';

import { Navbar } from '@/components';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      Layout in Home
    </main>
  );
};

export default Layout;
