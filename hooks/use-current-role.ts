import { useCurrentUser } from '@/hooks/use-current-user';

export const useCurrentRole = () => useCurrentUser()?.role;
