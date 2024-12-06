import { Outlet } from 'react-router-dom';
import Topbar from '@/components/Topbar';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111]">
      <Topbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;

