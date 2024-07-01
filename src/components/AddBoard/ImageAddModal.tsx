import { ChangeEvent, useState, useEffect } from 'react';
import { Zoom } from 'react-toastify';
import Image from 'next/image';
import CameraIcon from '@/../public/svg/camera_icon.svg';
import getImageUrl from '@/lib/apis/image/imageApi.api';
import { type ImageData } from '@/lib/apis/image/imageApi.api';
import { IMAGE_ERROR_MESSAGE, IMAGE_VALIDATION } from '@/constants/imageUpload';
import { OTHER_TYPE_ERROR_TEXT } from '@/constants/otherTypeErrorText';
import { StyledToastContainer } from '@/styles/ToastStyle';
import ToastSelect from '../common/ToastSelect';
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
  const [isLoading, setIsLoading] = useState(false);

  // 삽입할 이미지 유효성 검사
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const validFileName = IMAGE_VALIDATION.NAME_REGEX.test(file.name);
      const validFileExtension = IMAGE_VALIDATION.EXTENSION_REGEX.test(file.name.toLowerCase());
      const validFileSize = file.size <= IMAGE_VALIDATION.MAX_SIZE;

      let errorMessage = '';

      if (!validFileName) {
        errorMessage = IMAGE_ERROR_MESSAGE.INVALID_NAME;
      } else if (!validFileExtension) {
        errorMessage = IMAGE_ERROR_MESSAGE.INVALID_EXTENSION;
      } else if (!validFileSize) {
        errorMessage = IMAGE_ERROR_MESSAGE.INVALID_SIZE;
      }

      if (errorMessage) {
        ToastSelect({
          type: 'error',
          message: errorMessage,
        });
        setImage(null);
        setImagePreview(null);
      } else {
        setImage(file);
      }
    }
    e.target.value = '';
  };

  const handleClose = () => {
    setImage(null);
    setImagePreview(null);
    onClose();
  };

  // 이미지 삽입
  const handleInsertImage = async () => {
    try {
      setIsLoading(true);
      if (image) {
        const imageData: ImageData = { image };
        const response = await getImageUrl(imageData);
        if (response) {
          handleImageUrl(response.url);
        }
      }
    } catch (e: unknown) {
      ToastSelect({
        type: 'error',
        message: OTHER_TYPE_ERROR_TEXT,
      });
    } finally {
      setImage(null);
      setImagePreview(null);
      setIsLoading(false);
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
        <div className="relative my-5 h-[160px] w-auto rounded-10">
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
        disabled={!image || isLoading}
        isActive={!!image && !isLoading}
        variant="primary"
        className="ml-auto block w-1/3"
      >
        {isLoading ? '삽입 중...' : '삽입하기'}
      </CommonButton>
      <StyledToastContainer transition={Zoom} />
    </Modal>
  );
};

export default ImageAddModal;
