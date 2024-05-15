import { getAccounts } from '@/data/space';
import { currentUser } from '@/lib/auth';
import { NextPage } from 'next';

export const revalidate = 5;

const HomePage: NextPage = async ({}) => {
  return <>Home</>;
};

export default HomePage;
