import Image from 'next/image';
import KeyboardImage from '@/../public/image/LandingPage/Section2/keyboard-image.png';
import Content1 from '@/../public/image/LandingPage/Section2/content(1)-image.png';
import { RisingMotion } from '@/components/common/Motion'

const WriteSection = () => {
  return (
    <section className="relative h-[450px] bg-grayscale-500 py-[100px] md:h-[770px] md:py-[160px] lg:h-[1000px] lg:py-[200px]">
      <RisingMotion>
        <div className="flex justify-center gap-[10px] lg:gap-[30px]">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-[10px] lg:gap-[30px]">
              <span className="sectionTitle md:text-[20px] md:font-bold md:leading-[23px] lg:text-[30px] lg:leading-[34.5px]">
                WRITE
              </span>
              <p className="sectionDescription text-white md:text-[32px] md:font-normal md:leading-[36.8px] lg:text-[50px] lg:leading-[57.5px]">
                친구의 위키,
                <br />
                직접 작성해 봐요
              </p>
            </div>
            <Image
              src={KeyboardImage}
              alt="keyboard image"
              sizes="(min-width: 1280px) 364px, (min-width: 769px) 262px, (min-width: 480px) 133px, 133px"
              className="h-[162px] w-[133px] md:h-[322px] md:w-[262px] lg:h-[450px] lg:w-[364px]"
              placeholder="blur"
            />
          </div>
          <Image
            src={Content1}
            alt="content"
            sizes="(min-width: 1280px) 520px, (min-width: 769px) 365px, (min-width: 480px) 192px, 192px"
            className="h-[250px] w-[192px] md:h-[479px] md:w-[365px] lg:h-[681px] lg:w-[520px]"
            placeholder="blur"
          />
        </div>
      </RisingMotion>
    </section>
  );
};

export default WriteSection;
