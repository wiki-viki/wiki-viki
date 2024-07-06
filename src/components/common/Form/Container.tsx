import { AuthContainerProps } from '@/types/authFormType';

const Container = ({ title, children, className }: AuthContainerProps) => {
  return (
    <main className="centerOfScreen">
      <div className={`w-[335px] lg:w-[400px] ${className}`}>
        <span className="mb-10 block text-center text-2xl-semibold text-grayscale-500">
          {title}
        </span>
        {children}
      </div>
    </main>
  );
};

export default Container;
