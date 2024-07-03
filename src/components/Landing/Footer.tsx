const Footer = () => {
  return (
    <footer className="h-[152px] bg-grayscale-600 px-5 py-10 md:h-[230px] md:px-12 md:py-[60px] lg:p-[70px]">
      <span className="mb-2.5 block text-[10px] font-bold leading-[11.4px] text-white md:text-[16px]">
        Copyright ⓒ WikiViki. All Rights Reserved <br />
      </span>
      <div className="mb-5 flex flex-col gap-1">
        <span className="text-[8px] font-normal leading-[9.55px] text-white md:text-[14px] md:leading-[16.71px]">
          사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 | 대표 : 이지은 
        </span>
        <span className="text-[8px] font-normal leading-[9.55px] text-white md:text-[14px] md:leading-[16.71px]">
          서울특별시 중구 청계천로 123, 위키드빌딩
        </span>
      </div>
      <div className="flex gap-[15px]">
        <span className="text-[8px] font-normal leading-[9.55px] text-white md:text-[14px] md:font-medium md:leading-[16.71px]">
          서비스 이용약관
        </span>
        <span className="text-[8px] font-normal leading-[9.55px] text-white md:text-[14px] md:font-medium md:leading-[16.71px]">
          개인정보 취급방침
        </span>
        <span className="text-[8px] font-normal leading-[9.55px] text-white md:text-[14px] md:font-medium md:leading-[16.71px]">
          전자금융거래 기본약관
        </span>
      </div>
    </footer>
  );
};

export default Footer;
