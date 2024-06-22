import Link from 'next/link';
import { AuthSwitchPromptProps } from '@/types/authType';

const AuthSwitchPrompt = ({ href, auth }: AuthSwitchPromptProps) => {
  return (
    <div className="block text-center">
      {href === '/signup' ? (
        <div>
          <span className="text-md-regular text-grayscale-400 mr-2.5">이미 회원이신가요? </span>
          <Link href={href}>
            <span className="text-md-regular text-primary-green-200">{auth}하기</span>
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3">
          <Link href="">
            <span className="text-md-regular text-grayscale-400">비밀번호 재설정</span>
          </Link>
          <div className="w-px h-3 bg-grayscale-400"></div>
          <Link href={href}>
            <span className="text-md-regular text-primary-green-200">{auth}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthSwitchPrompt;
