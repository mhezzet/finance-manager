import { Poppins } from 'next/font/google';
import Image from 'next/image';

const poppinsFont = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

interface IAuthCardHeader {
  label: string;
}

export const AuthCardHeader: React.FC<IAuthCardHeader> = ({ label }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className="flex items-center gap-2 text-3xl font-semibold">
        <Image src="/logo-100.svg" width={30} height={30} alt="logo" />
        Finance Manager
      </h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
