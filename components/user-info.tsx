import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ExtendedUser } from '@/types';

interface IUserInfo {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo: React.FC<IUserInfo> = ({ label, user }) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader className="text-center text-2xl font-semibold">
        <p>{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-lg flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 px-1 font-mono text-xs">
            {user?.id}
          </p>
        </div>
        <div className="border-lg flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 px-1 font-mono text-xs">
            {user?.name}
          </p>
        </div>
        <div className="border-lg flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ُEmail</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 px-1 font-mono text-xs">
            {user?.email}
          </p>
        </div>
        <div className="border-lg flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 px-1 font-mono text-xs">
            {user?.role}
          </p>
        </div>
        <div className="border-lg flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}>
            {user?.isTwoFactorEnabled ? 'ON' : 'Off'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
