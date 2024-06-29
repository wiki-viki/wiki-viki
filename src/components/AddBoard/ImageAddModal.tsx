import { ChangeEvent, useState, useEffect } from 'react';
import Image from 'next/image';
import CameraIcon from '@/../public/svg/camera_icon.svg';
import Modal from '../common/Modal';
import CommonButton from '../common/CommonButton';

interface ImageAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleImageUrl: (url: string) => void;
}

const ImageAddModal = ({ isOpen, onClose, handleImageUrl }: ImageAddModalProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };

  const handleClose = () => {
    setImage(null);
    setImagePreview(null);
    onClose();
  };

  const handleInsertImage = () => {
    // TODO: 이미지 업로드 API 사용하여 URL 받아올 예정
    if (imagePreview) {
      handleImageUrl(
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wikied/user/114/1719367563327/imagetest.jpeg',
      );
      setImage(null);
      setImagePreview(null);
    }
  };

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImagePreview(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h3 className="center text-lg-semibold md:text-2lg-semibold">이미지</h3>
      <input
        onChange={handleImage}
        className="hidden"
        id="image"
        name="image"
        type="file"
        accept=".png, .jpg, .jpeg"
      />
      {image && imagePreview ? (
        <div className="relative my-5 h-[160px] w-auto rounded-10 border">
          <Image
            alt="등록한 이미지"
            src={imagePreview}
            style={{ objectFit: 'cover', borderRadius: '12px' }}
            fill
          />
        </div>
      ) : (
        <label
          htmlFor="image"
          className="center my-5 h-[160px] w-full cursor-pointer rounded-10 bg-grayscale-100"
        >
          <CameraIcon />
        </label>
      )}
      <CommonButton
        onClick={handleInsertImage}
        disabled={!image}
        isActive={!!image}
        variant="primary"
        className="ml-auto block w-1/3"
      >
        삽입하기
      </CommonButton>
    </Modal>
  );
};

export default ImageAddModal;
