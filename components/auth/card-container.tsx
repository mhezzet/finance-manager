import { BackButton } from '@/components/auth/back-button';
import { AuthCardHeader } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface ICardContainer {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardContainer: React.FC<ICardContainer> = (props) => {
  const { backButtonHref, backButtonLabel, children, headerLabel, showSocial } = props;

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <AuthCardHeader label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
