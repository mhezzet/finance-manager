import Image from 'next/image';
import Link from 'next/link';

interface IHeaderLogo {}

export const HeaderLogo: React.FC<IHeaderLogo> = ({}) => {
  return (
    <Link href="/">
      <div className="hidden items-center lg:flex">
        <Image src="/logo-100-white.svg" width={28} height={28} alt="logo" />
        <p className="ml-2.5 text-2xl font-semibold text-white">Finance Manager</p>
      </div>
    </Link>
  );
};
