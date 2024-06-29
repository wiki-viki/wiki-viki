import dynamic from 'next/dynamic';
import Modal from '@/components/common/Modal';
import useBoolean from '@/hooks/useBoolean';
import 'react-quill/dist/quill.snow.css';

const EditorComponent = dynamic(
  () => {
    return import('react-quill');
  },
  {
    loading: () => {
      return <div>...loading</div>;
    },
    ssr: false,
  },
);

const text =
  '<p><strong>ㅋㅋ</strong></p><p><em>ㅋㅋ</em></p><p><u>ㅋㅋ</u></p><p class="ql-align-center">ㅋㅋ</p><p class="ql-align-right">ㅋㅋ</p><ul><li>ㅋㅋ</li></ul><ol><li>ㅋㅋ</li></ol><p><span style="color: rgb(230, 0, 0);">ㅋㅋ</span></p><p><img src="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wikied/user/114/1719367563327/imagetest.jpeg" width="141" height="79.11385758196721" style="cursor: nwse-resize;"></p>';

const text1 =
  '<p><strong><em><u>안녕하세요</u></em></strong><img src="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wikied/user/114/1719367563327/imagetest.jpeg" width="248" height="139.1541994750656" style=""></p><p class="ql-align-center">안녕</p><ul><li class="ql-align-right">리스트</li></ul><ol><li class="ql-align-right">리스트</li></ol><p class="ql-align-center"><span style="color: rgb(153, 51, 255);">보라색</span></p><p class="ql-align-center"><a href="https://www.naver.com/" rel="noopener noreferrer" target="_blank">링크</a></p>';

const Test = () => {
  const { value, handleOn, handleOff } = useBoolean();

  return (
    <div>
      <EditorComponent value={text} theme="bubble" readOnly={true} modules={{ toolbar: null }} />
      <div className="my-6 border" />
      <EditorComponent value={text1} theme="snow" readOnly={true} modules={{ toolbar: false }} />
      <button onClick={handleOn}>버튼</button>
      <Modal isOpen={value} onClose={handleOff}>
        <div>
          하이
          <p>안녕~~~~~~~</p>
          <p>안에 내용이 길어지거나 짧아지면 height도 자동 조정</p>
        </div>
      </Modal>
    </div>
  );
};

export default Test;
