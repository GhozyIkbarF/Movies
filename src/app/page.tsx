"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  fetchRecomendationsMovie,
  searchMovie,
  fetchPopularMovie,
  fetchDetailMovie,
} from "@/service";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";
import { convertDate } from "@/utils";

export type Movie = {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
};

export const object = ({ movie }: { movie: Movie }) => {
    const data = {
      id: movie.id,
      poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "",
      title: movie.title,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    };
  
    return data;
  };


export default function Home() {
  const [banner, setBanner] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pa, setPa] = useState<string>("");
  const [searchQuery] = useDebounce(pa, 1500);

  async function getData() {
    const response = await fetchPopularMovie();
    const detailResponse = await fetchDetailMovie(response.results[0].id, {
      isRevalidate: true,
    });
    const movie = object({ movie: detailResponse });
    setBanner((prevBanner) => ({
      ...prevBanner,
      ...movie,
    }));
  }
  
  const handleFetchMovies = async (event: React.FormEvent<HTMLFormElement> | null = null) => {
    if (event) event.preventDefault();
    const data = await fetchRecomendationsMovie();
    const movies = data.results.map((movie: any) => object({ movie }));
    setMovies(movies);
  };
  
  const handleSearchMovies = async (
    searchQuery: string,
    event: React.FormEvent<HTMLFormElement> | null = null
    ) => {
      if (event) event.preventDefault();
      const data = await searchMovie(searchQuery);
      const movies = data.results.map((movie: any) => object({ movie }));
      setMovies(movies);
    };
    
    useEffect(() => {
    handleFetchMovies();
  }, []);

  useEffect(() => {
    if (searchQuery.length < 1) handleFetchMovies();
    else handleSearchMovies(searchQuery);
  }, [searchQuery]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      {banner?.poster_path && (
        <div className="relative w-full h-[700px]">
          <Image
            src={banner?.poster_path ?? ""}
            fill={true}
            objectPosition="center"
            alt="banner"
            priority={true}
          />
        </div>
      )}
      <div className="min-w-[300px] w-1/4 mt-5">
        <input
          type="text"
          className="px-3 py-2 text-black border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-lg sm:text-sm"
          placeholder="Search Movies"
          onChange={(e) => setPa(e.target.value)}
        />
      </div>
      <div className="mt-5 grid gap-4 grid-cols-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </div>
    </main>
  );
}

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [showOverview, setShowOverview] = useState(false);
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center rounded-lg cursor-pointer hover:scale-105 transition-all"
      onClick={() => router.push(`/detail/${movie.id}`)}
    >
      <div className="relative w-64 h-96">
        <Image
          src={movie?.poster_path}
          fill={true}
          sizes="(max-width: 256px)"
          className="rounded-t-lg"
          alt={`img ${movie.title}`}
          priority={true}
        />
      </div>
      <div className="w-64 p-2">
        <h1 className="text-xl font-bold">{movie.title}</h1>
        <p className="text-sm text-gray-500">{convertDate(movie.release_date)}</p>
      </div>
    </div>
  );
};


// const Banner  = () => {
//   return (
//   )
// }