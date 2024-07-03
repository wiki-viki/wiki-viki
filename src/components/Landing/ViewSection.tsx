import Image from 'next/image';
import Content2 from '@/../public/image/LandingPage/Section4/content(2)-image.png';
import Content3 from '@/../public/image/LandingPage/Section4/content(3)-image.png';
import BellImage from '@/../public/image/LandingPage/Section4/bell-image.png';
import { RisingMotion } from '@/components/common/Motion'

const ViewSection = () => {
  return (
    <section className="h-[512px] bg-[#ECF0FA] py-[100px] md:h-[933px] md:py-[160px] lg:h-[1291px] lg:py-[200]">
      <RisingMotion>
        <div className="flex justify-center">
          <div className="flex w-[335px] flex-col gap-10 md:w-[648px] md:gap-[80px] lg:w-[924px]">
            <div className="flex flex-col gap-[10px]">
              <span className="sectionTitle md:text-[20px] md:font-bold md:leading-[23px] lg:text-[30px] lg:leading-[34.5px]">
                VIEW
              </span>
              <p className="sectionDescription text-grayscale-500 md:text-[32px] md:font-normal md:leading-[36.8px] lg:text-[50px] lg:leading-[57.5px]">
                친구들이 달아준
                <br />
                내용을 확인해 봐요
              </p>
            </div>
            <div>
              <div className="mb-2.5">
                <Image
                  src={Content2}
                  alt="content"
                  className="h-[102px] w-[335px] md:h-[196px] md:w-[648px] lg:h-[280px] lg:w-[924px]"
                  placeholder="blur"
                />
              </div>
              <div className="flex gap-2.5">
                <Image
                  src={BellImage}
                  alt="content"
                  className="size-[102px] md:size-[198px] lg:size-[280px]"
                  placeholder="blur"
                />
                <Image
                  src={Content3}
                  alt="content"
                  className="h-[102px] w-[223px] md:h-[198px] md:w-[428px] lg:h-[280px] lg:w-[640px]"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </div>
      </RisingMotion>
    </section>
  );
};

export default ViewSection;
