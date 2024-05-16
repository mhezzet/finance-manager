import { useAccountModal } from '@/hooks/use-account-modal';

interface IAccountColumn {
  account: { name: string; id: string };
}

export const AccountColumn: React.FC<IAccountColumn> = ({ account }) => {
  const { onOpen, setAccount } = useAccountModal();

  const onClick = () => {
    setAccount(account);
    onOpen();
  };

  return (
    <div onClick={onClick} className="flex cursor-pointer items-center hover:underline">
      {account.name}
    </div>
  );
};
