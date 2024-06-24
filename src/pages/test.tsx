import Modal from '@/components/common/Modal';
import useBoolean from '@/hooks/useBoolean';

const Test = () => {
  const { value, handleOn, handleOff } = useBoolean();

  return (
    <div>
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
