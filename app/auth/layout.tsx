import { NextPage } from 'next';
import Image from 'next/image';

interface Props {
  children: React.ReactNode;
}

const AuthLayout: NextPage<Props> = ({ children }) => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center">{children}</div>
      <div className="hidden items-center justify-center bg-blue-600 lg:flex">
        <Image src="/logo-100-white.svg" width={100} height={100} alt="logo" />
      </div>
    </div>
  );
};

export default AuthLayout;
