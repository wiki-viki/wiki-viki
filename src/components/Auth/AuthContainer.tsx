import { AuthContainerProps } from '@/types/AuthType';

const AuthContainer = ({ title, children }: AuthContainerProps) => (
  <main className="container md:w-[335px] lg:w-[400px]">
    <span className="text-2xl-semibold text-grayscale-500 text-center block">{title}</span>
    {children}
  </main>
);

export default AuthContainer;