import { CheckCircledIcon } from '@radix-ui/react-icons';

interface IFormSuccess {
  message?: string;
}

export const FormSuccess: React.FC<IFormSuccess> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <CheckCircledIcon className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};
