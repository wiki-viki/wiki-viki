import React, { ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './style.module.css';

interface BoardCarouselProps {
  children: ReactNode;
}

const BoardCarousel = ({ children }: BoardCarouselProps) => {
  const settings = {
    infinite: false,
    slidesToShow: 1.4,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider className={style.carousel} {...settings}>
      {children}
    </Slider>
  );
};

export default BoardCarousel;
