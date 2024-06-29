import useMutation from '@/hooks/useMutation';

const getChangePasswordData = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isError, statusCode, axiosFetch } = useMutation({
    options: {
      method: 'patch',
      url: 'users/me/password',
    },
    includeAuth: true,
  });

  return { isError, statusCode, axiosFetch };
};

export default getChangePasswordData
