import { currentUser } from '@/lib/auth';

interface IWelcomeMsg {}

export const WelcomeMsg: React.FC<IWelcomeMsg> = async ({}) => {
  const user = await currentUser();

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-medium text-white lg:text-4xl">Welcome Back, {user?.name}👋</h2>
      <p className="text-sm text-[#89b6fd] lg:text-base">This is your Financial Overview Report</p>
    </div>
  );
};
