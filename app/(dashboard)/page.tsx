import { getSummary } from '@/data/summary';
import { currentUser } from '@/lib/auth';
import { NextPage } from 'next';

interface IHomePage {
  searchParams: {
    from?: string;
    to?: string;
    accountId?: string;
  };
}

const HomePage: NextPage<IHomePage> = async ({ searchParams }) => {
  const { from, to, accountId } = searchParams;
  const user = await currentUser();

  const summary = await getSummary(user?.id || '', from, to, accountId);

  console.log({ summary });

  return <>Home</>;
};

export default HomePage;
