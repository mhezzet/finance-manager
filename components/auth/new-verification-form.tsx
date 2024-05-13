'use client';
import { newVerification } from '@/actions/auth/verification';
import { CardContainer } from '@/components/auth/card-container';
import { FormErrors } from '@/components/form-errors';
import { FormSuccess } from '@/components/form-success';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

interface INewVerificationForm {}

export const NewVerificationForm: React.FC<INewVerificationForm> = ({}) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [verified, setVerified] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(async () => {
    if (verified) return;

    if (!token) {
      setError('Missing Token!');
      return;
    }

    try {
      const { error, success } = await newVerification(token);
      setError(error);
      setSuccess(success);
      setVerified(true);
    } catch (error) {
      setError('Something went wrong!');
    }
  }, [verified, token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardContainer
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={verified ? 'Email Verified!' : ''} />
        {!verified && <FormErrors message={error} />}
      </div>
    </CardContainer>
  );
};
