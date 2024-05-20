'use client';

import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCSVReader } from 'react-papaparse';
import { useImportTransactions } from '@/hooks/use-import-transactions';
import { useQueryState } from 'nuqs';

interface IImportTransactions {}

export const ImportTransactions: React.FC<IImportTransactions> = ({}) => {
  const { CSVReader } = useCSVReader();
  const { setTransactions } = useImportTransactions();
  const [_, setView] = useQueryState('view', { shallow: false });

  const onUpload = (data: any) => {
    setTransactions(data);
    setView('IMPORT');
  };

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
          <Upload className="mr-2 size-4" />
          Import
        </Button>
      )}
    </CSVReader>
  );
};
