import useIsLogin from '@/hooks/useIsLogin';
import useBoolean from '@/hooks/useBoolean';
import HamburgerIcon from '../../../../public/svg/hamburger.svg';
import HamburgerMenu from './HamburgerMenu';
import { HeaderContainer, LeftSection, RightSection } from '.';

const MobileNavigationBar = () => {
  const isLogin = useIsLogin();
  const { value, handleOn, handleOff } = useBoolean();

  return (
    <HeaderContainer>
      <LeftSection />
      <RightSection isLogin={isLogin} handleOpen={handleOn}>
        <div className="cursor-pointer" onClick={handleOn}>
          <HamburgerIcon />
        </div>
      </RightSection>
      <HamburgerMenu isOpen={value} onClose={handleOff} isLogin={isLogin} />
    </HeaderContainer>
  );
};

export default MobileNavigationBar;
