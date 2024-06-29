import useMutation from '@/hooks/useMutation';

const getLoginData = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isError, statusCode, axiosFetch } = useMutation({
    options: {
      method: 'post',
      url: 'auth/signin',
    },
    includeAuth: true,
  });

  return { isError, statusCode, axiosFetch };
};

export default getLoginData
