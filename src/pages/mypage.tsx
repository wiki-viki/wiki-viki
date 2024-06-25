import { Container, ChangePassWord, CreateWiki } from '@/components/Account';

const MyPage = () => {
  return (
    <Container title="계정 설정">
      <ChangePassWord />
      <CreateWiki />
    </Container>
  );
};

export default MyPage;
