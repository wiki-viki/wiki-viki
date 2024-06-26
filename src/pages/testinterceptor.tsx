import useAxiosFetch from '@/hooks/useAxiosFetch';

const TestInterceptor = () => {

  const { data, isLoading, isError, axiosFetch } = useAxiosFetch({
    skip: false,
    options: {
      method: 'get',
      url: 'users/me',
    },
    includeAuth: true,
  });

  return (
    <div>
      <p>인터셉터 테스트</p>
    </div>
  );
};

export default TestInterceptor;
