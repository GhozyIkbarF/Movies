import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import Card from './Card';
import { MovieProps } from './Card';
import { object } from '@/app/detail/[id]/page';
import Link from 'next/link';

export type ListMovieProps = {
    id: number;
    poster_path: string | undefined;
    title: string;
    release_date: string;
    vote_average: number;    
  }[];
  
  const ListMovies = ({movie, title, href}: {movie: ListMovieProps, title: string, href: string}) => {
    return (
      <div className="flex flex-col justify-center w-full mt-10 gap-3">
        <div className='flex justify-between px-5 font-extrabold'>
            <h1 className='text-lg'>{title}</h1>
            <Link href={href}>See All</Link>
        </div>
        <div className='w-full mb-2'>
            <Swiper
              slidesPerView={2}
            spaceBetween={5}
            scrollbar={{
                hide: false,
            }}
                breakpoints={{
                    450: {
                        slidesPerView: 2,
                        spaceBetween: 2,
                    },
                    476: {
                        slidesPerView: 3,
                        spaceBetween: 2,
                    },
                    // 640: {
                    //   slidesPerView: 4,
                    //   spaceBetween: 20,
                    // },
                    768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                    },
                    1024: {
                    slidesPerView:5,
                    spaceBetween: 40,
                    },
                    1245: {
                    slidesPerView:8,
                    spaceBetween: 40,
                    },
                }}
            modules={[Scrollbar]}
            className="mySwiper"
            >
            {movie?.map((movie: MovieProps, index: number) => (
                <div key={index}>
                    <SwiperSlide key={index}>
                            <Card 
                                movie={movie} 
                                isScale='' 
                            />
                    </SwiperSlide>
                </div>
            ))}
            </Swiper>
        </div>
      </div>
    )
  }

  export default ListMovies
