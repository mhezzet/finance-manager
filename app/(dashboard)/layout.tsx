import { Header } from '@/components/header';
import { NextPage } from 'next';
import { Suspense } from 'react';

interface IDashboardLayout {
  children: React.ReactNode;
}

const DashboardLayout: NextPage<IDashboardLayout> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-4">{children}</main>
    </>
  );
};

export default DashboardLayout;
