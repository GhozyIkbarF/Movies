import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { convertDate } from '@/utils';

type MovieProps = {
    id: number;
    poster_path: string | undefined;
    title: string;
    release_date: string;
    vote_average: number;    
};

export default function Card({movie, isScale = 'scale-0'}: { movie: MovieProps, isScale: string}) {
  const router = useRouter();
  return (
    <section className={`w-[150px] rounded-lg overflow-hidden cursor-pointer hover:${isScale}`} onClick={() => router.push(`/detail/${movie.id}`)}>
        <div className='relative w-[150px] h-[255px]'>
            <Image src={movie?.poster_path ?? ''} fill={true} alt="banner" priority={true} />
        </div>
        <div className='mt-2 mb-3'>
            <h1 className='text-sm font-bold'>{movie?.title ?? ''}</h1>
            <p className='text-xs'>{convertDate(movie?.release_date)}</p>
        </div>
    </section>
  )
}

export type { MovieProps }