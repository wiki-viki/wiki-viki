import { AuthContainerProps } from '@/types/authType';

const AuthContainer = ({ title, children }: AuthContainerProps) => (
  <main className="container md:w-[335px] lg:w-[400px]">
    <span className="text-2xl-semibold text-grayscale-500 text-center mb-[50px] block">{title}</span>
    {children}
  </main>
);

export default AuthContainer;
