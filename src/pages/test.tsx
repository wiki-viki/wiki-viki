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
        </div>
      </Modal>
    </div>
  );
};

export default Test;
