import { Header } from '@/components/header';
import { SheetProvider } from '@/components/sheet-provider';
import { NextPage } from 'next';

interface IDashboardLayout {
  children: React.ReactNode;
}

const DashboardLayout: NextPage<IDashboardLayout> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="px-3 lg:px-4">{children}</main>
      <SheetProvider />
    </div>
  );
};

export default DashboardLayout;
