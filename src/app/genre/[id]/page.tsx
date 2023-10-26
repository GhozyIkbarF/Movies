// "use client"
// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation';
// import { fetchGenreMovie } from '@/service';
// import { MoviesType } from '@/app/page';
// import { object } from '@/app/page';

// export default function Genre({ params: { id } }: { params: { id: string } }) {
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [detail, setDetail] = useState<MoviesType | null>();
//   const [showModal, setShowModal] = useState<boolean>(false);

// console.log(detail);

  
//   const router = useRouter();

//   const getData = async (id: number) => {
//     setIsLoading(true);
//     try{
//       const response = await fetchGenreMovie(id);
//       setDetail(object({movies: response}));
//     } catch (error: unknown) {
//       throw new Error(typeof error === 'string' ? error : 'An unknown error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData(Number(id));
//   }, [id]);

//   return (
//     <div>Genre</div>
//   )
// }
