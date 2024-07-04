import useMutation from '@/hooks/useMutation';

const useChangePasswordData = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isError, statusCode, mutation } = useMutation({
    options: {
      method: 'patch',
      url: 'users/me/password',
    },
    includeAuth: true,
  });

  return { isError, statusCode, mutation };
};

export default useChangePasswordData
