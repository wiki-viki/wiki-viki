import { AuthContainerProps } from '@/types/authFormType';

const Container = ({ title, children }: AuthContainerProps) => {
  return (
    <main className="centerOfScreen">
      <div className="mt-[70px] md:w-[335px] lg:w-[400px]">
        <span className="mb-[50px] block text-center text-2xl-semibold text-grayscale-500">
          {title}
        </span>
        {children}
      </div>
    </main>
  );
};

export default Container;