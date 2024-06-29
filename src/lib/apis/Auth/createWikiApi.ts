import useMutation from '@/hooks/useMutation';

const getCreateWikiApi = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isError, statusCode, axiosFetch } = useMutation({
    options: {
      method: 'post',
      url: 'profiles',
    },
    includeAuth: true,
  });

  return { isError, statusCode, axiosFetch };
};

export default getCreateWikiApi
