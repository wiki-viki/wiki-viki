import useMutation from '@/hooks/useMutation';

const useCreateWikiApi = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isError, statusCode, mutation } = useMutation({
    options: {
      method: 'post',
      url: 'profiles',
    },
    includeAuth: true,
  });

  return { isError, statusCode, mutation };
};

export default useCreateWikiApi
