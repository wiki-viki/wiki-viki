import React, { useState } from 'react';
import Modal from '@/components/common/Modal';

const Test = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          return setIsOpen(!isOpen);
        }}
      >
        버튼
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          return setIsOpen(!isOpen);
        }}
      >
        <div>
          하이
          <p>안녕~~~~~~~</p>
        </div>
      </Modal>
    </div>
  );
};

export default Test;
