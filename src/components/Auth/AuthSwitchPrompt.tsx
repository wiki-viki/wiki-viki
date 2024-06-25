import Link from 'next/link';
import { AuthSwitchPromptProps } from '@/types/authFormType';

const AuthSwitchPrompt = ({ href, auth }: AuthSwitchPromptProps) => {
  return (
    <div className="block text-center">
      {href === '/signup' ? (
        <div className='flex flex-col gap-2'>
          <span className="mr-2.5 text-md-regular text-grayscale-400">아직 회원이 아니신가요? <br />회원가입하고 나만의 위키를 공유해보세요! </span>
          <Link href={href}>
            <span className="text-md-regular text-primary-green-200">{auth}하기</span>
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3">
          <Link href="">
            <span className="text-md-regular text-grayscale-400">이미 회원이신가요?</span>
          </Link>
          <Link href={href}>
            <span className="text-md-regular text-primary-green-200">{auth}하기</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthSwitchPrompt;
