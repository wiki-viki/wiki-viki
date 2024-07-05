import useMutation from '@/hooks/useMutation';

const useLoginData = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, isError, statusCode, mutation } = useMutation({
    options: {
      method: 'post',
      url: 'auth/signin',
    },
    includeAuth: true,
  });

  return { isLoading, isError, statusCode, mutation };
};

export default useLoginData
