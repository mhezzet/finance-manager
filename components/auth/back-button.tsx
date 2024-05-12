'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface IBackButton {
  label: string;
  href: string;
}

export const BackButton: React.FC<IBackButton> = ({ href, label }) => {
  return (
    <Button variant="link" className="m-auto font-normal" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
