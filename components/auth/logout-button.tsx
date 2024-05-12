'use client';

import { logout } from '@/actions/logout';

interface ILogoutButton {
  children: React.ReactNode;
}

export const LogoutButton: React.FC<ILogoutButton> = ({ children }) => {
  const onClick = () => {
    logout();
  };
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
