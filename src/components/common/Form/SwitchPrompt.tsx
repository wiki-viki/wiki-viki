import Link from 'next/link';
import { AuthSwitchPromptProps } from '@/types/authFormType';

const AuthSwitchPrompt = ({ href, auth }: AuthSwitchPromptProps) => {
  return (
    <>
      {href === '/signup' ? (
        <div className='flex'>
          <span className="mr-2.5 text-md-regular text-grayscale-400">아직 회원이 아니신가요?</span>
          <Link href={href}>
            <span className="text-md-regular text-primary-green-200">{auth}하기</span>
          </Link>
        </div>
      ) : (
        <div className="flex">
          <span className="mr-2.5 text-md-regular text-grayscale-400">이미 회원이신가요?</span>
          <Link href={href}>
            <span className="text-md-regular text-primary-green-200">{auth}하기</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthSwitchPrompt;
