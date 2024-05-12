'use client';

import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import { FormErrors } from '../form-errors';

interface IRoleGate {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const RoleGate: React.FC<IRoleGate> = ({ allowedRoles, children }) => {
  const currentUserRole = useCurrentRole();

  if (!currentUserRole || !allowedRoles.includes(currentUserRole)) {
    return <FormErrors message="You do no have permission to view this content" />;
  }

  return <>{children}</>;
};
