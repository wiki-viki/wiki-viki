import { useEffect } from 'react';
import AnimatedLogo from './AnimatedLogo';

type SplashScreenProps = {
  onFinish: () => void;
};

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000);
    return () => {
      return clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <AnimatedLogo />
    </div>
  );
};

export default SplashScreen;
