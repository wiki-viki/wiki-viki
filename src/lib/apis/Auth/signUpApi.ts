import useMutation from '@/hooks/useMutation';

const getSignUpData = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isError, statusCode, axiosFetch } = useMutation({
    options: {
      method: 'post',
      url: 'auth/signup',
    },
  });

  return { isError, statusCode, axiosFetch };
};

export default getSignUpData;
