import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface IFormErrors {
  message?: string;
}

export const FormErrors: React.FC<IFormErrors> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2  rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};
