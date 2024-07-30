import Headbar from '@/components/Headbar';
import Sidebar from '@/components/Sidebar';
import React, { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
      <>
        <Sidebar />
        <main className='ml-[260px] px-8 py-7'>
            <Headbar/>
            {children}
        </main>
      </>
    );
  };
  
  export default RootLayout;