// import React from 'react'
// import Image from 'next/image';
// import { fetchDetailMovie, fetchPopularMovie } from '@/service';
// type Movie = {
//     id: number;
//     poster_path: string | undefined;
//     image: string;
//     title: string;
//     release_date: string;
//     vote_average: number;
//     overview: string;
//   };

//   const object = ({movie}: { movie: Movie }) => {
//     return {
//       id: movie.id,
//       image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//       title: movie.title,
//       release_date: movie.release_date,
//       vote_average: movie.vote_average,
//       overview: movie.overview,
//     }
//   }

//   async function getData(): Promise<Movie> {
//     const response = await fetchPopularMovie();
//     const detailResponse = await fetchDetailMovie(response.results[0].id, {isRevalidate: true});
//     const movie = object({movie: detailResponse});
//     return {
//       ...movie,
//       poster_path: detailResponse.poster_path
//     };
//   }  

// export default async function Banner() {
//     const banner = await getData();
//   return (
//     <div className="relative w-full min-h-screen">
//         <Image src={banner?.image ?? ''} fill={true} objectPosition="center" alt="banner" priority={true} />
//       </div>
//   )
// }
