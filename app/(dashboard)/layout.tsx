import React from 'react'
import Sidebar from './_components/sidebar/Sidebar';

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <main className="h-full">
        <Sidebar />
        {children}
      </main>
    );
  }
  
  export default DashboardLayout;
  