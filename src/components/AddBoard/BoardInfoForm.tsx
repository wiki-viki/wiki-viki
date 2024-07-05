import React from 'react';

const TITLE_MAX_LEN = 30;

interface PostFormProps {
  title: string;
  contentLength: { withSpaces: number; withoutSpaces: number };
  setTitle: (title: string) => void;
}

const BoardInfoForm: React.FC<PostFormProps> = ({ title, contentLength, setTitle }) => {
  return (
    <>
      <div>
        <div className="mt-1 border-t" />
        <div className="flex items-center justify-between gap-2">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            className="flex-1 rounded-sm py-3 text-lg-medium outline-none md:text-xl-medium"
            placeholder="제목을 입력해주세요"
            maxLength={TITLE_MAX_LEN}
          />
          <span className="text-xs-medium md:text-md-medium">
            {title.length}/<span className="text-primary-green-200">{TITLE_MAX_LEN}</span>
          </span>
        </div>
        <div className="border-t" />
      </div>
      <span className="text-md-medium md:text-lg-medium">
        공백포함 : 총<span className="text-primary-green-200"> {contentLength.withSpaces}</span>자 |
        공백제외: 총<span className="text-primary-green-200"> {contentLength.withoutSpaces}</span>자
      </span>
    </>
  );
};

export default BoardInfoForm;
