import useMutation from '@/hooks/useMutation';

const useSignUpData = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isError, statusCode, mutation } = useMutation({
    options: {
      method: 'post',
      url: 'auth/signup',
    },
  });

  return { isError, statusCode, mutation };
};

export default useSignUpData;
