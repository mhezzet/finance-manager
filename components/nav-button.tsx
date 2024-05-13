import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface INavButton {
  label: string;
  href: string;
  isActive: boolean;
}

export const NavButton: React.FC<INavButton> = (props) => {
  const { href, isActive, label } = props;

  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        'w-full justify-between border-none font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0 lg:w-auto',
        isActive ? 'bg-white/10 text-white' : 'bg-transparent',
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
