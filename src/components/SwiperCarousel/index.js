import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { useMediaQuery, useTheme } from '@mui/material';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CategoryItem from '../categoryItem';
import Skeleton from '@mui/material/Skeleton';

export default function Carousel({ categories }) {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const tablet = useMediaQuery(theme.breakpoints.only('sm'));
  const responsive = desktop ? 4 : tablet ? 3 : 2;
  return (
    <Swiper
      rewind={true}
      slidesPerView={responsive}
      spaceBetween={10}
      freeMode={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      keyboard={{
        enabled: true,
      }}
      modules={[Keyboard, FreeMode, Navigation, Pagination]}
      className='mySwiper'
    >
      {categories.map((category) => {
        return (
          <SwiperSlide key={category.id}>
            <CategoryItem
            category={category}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
