import { CardContainer } from '@/components/auth/card-container';

interface IErrorCard {}

export const ErrorCard: React.FC<IErrorCard> = ({}) => {
  return (
    <CardContainer
      headerLabel="Oops something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="text-center">⚠️</div>
    </CardContainer>
  );
};
