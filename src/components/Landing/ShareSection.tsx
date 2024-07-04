import Image from 'next/image';
import { motion } from 'framer-motion';
import MegaPhoneImage from '@/../public/image/LandingPage/Section3/megaphone-image.png';
import CloverImage from '@/../public/image/LandingPage/Section3/clover-image.png';
import SpeechBubbleImage from '@/../public/image/LandingPage/Section3/speech-bubble-image.png';
import PhoneImage from '@/../public/image/LandingPage/Section3/phone-image.png';
import { RisingMotion } from '@/components/common/Motion'

const images = [
  { src: MegaPhoneImage, alt: 'mega phone image' },
  { src: CloverImage, alt: 'colver image' },
  { src: SpeechBubbleImage, alt: 'speech bubble image' },
  { src: PhoneImage, alt: 'phone image' },
];

const repeatImages = Array(100).fill(images).flat();

const ShareSection = () => {
  return (
    <section className="bg-grayscale-100 py-[100px] md:py-[160px] lg:py-[200px]">
      <RisingMotion>
      <div className="mb-10 flex justify-center md:mb-[80px]">
        <div className="flex w-[335px] flex-col gap-[10px] text-right md:w-[648px] lg:w-[924px]">
          <span className="sectionTitle md:text-[20px] md:font-bold md:leading-[23px] lg:text-[30px] lg:leading-[34.5px]">
            SHARE
          </span>
          <p className="sectionDescription text-grayscale-500 md:text-[32px] md:font-normal md:leading-[36.8px] lg:text-[50px] lg:leading-[57.5px]">
            내 위키 만들고
            <br />
            친구에게 공유해요
          </p>
        </div>
      </div>
      </RisingMotion>

      <motion.div
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 500,
          ease: 'linear',
        }}
        initial={{ x: 0 }}
        style={{
          display: 'flex',
          marginTop: '10px',
          justifyContent: 'center',
          gap: '15px',
          width: `calc(100% * ${repeatImages.length / images.length / 2})`,
        }}
      >
        {repeatImages.map((image, index) => {
          return (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              className="size-[76px] md:size-[147px] lg:size-[360px]"
              placeholder="blur"
            />
          );
        })}
      </motion.div>
    </section>
  );
};

export default ShareSection;
