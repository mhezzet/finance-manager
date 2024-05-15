'use client';

import { useMountedState } from 'react-use';
import { NewSpaceSheet } from '@/components/space/new-space-sheet';
import { UpdateAccountSheet } from '@/components/space/update-account-sheet';

interface ISheetProvider {}

export const SheetProvider: React.FC<ISheetProvider> = ({}) => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewSpaceSheet />
      <UpdateAccountSheet />
    </>
  );
};
