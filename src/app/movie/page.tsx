"use client";
import React, { useState, useEffect } from "react";
import { fetchPopularMovie } from "@/service";
import { ListMovieProps } from "@/components/ListMovies";
import { MovieProps } from "@/components/Card";
import Card from "@/components/Card";

export default function Popular() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<ListMovieProps>([]);
  const [page, setPage] = useState<number>(1);

  const setData = ({ results }: { results: ListMovieProps }) => {
    const movies = results?.map((movie: MovieProps) => {
      return {
        id: movie.id,
        poster_path: `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`,
        title: movie.title,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      };
    });
    return movies;
  };
  async function getData(page: number) {
    try {
      setIsLoading(true);
      const res = await fetchPopularMovie({ page });
      const movies = setData({ results: res.results });
      setMovies((prev: ListMovieProps) => [...prev, ...movies]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getData(page);
  }, []);

  useEffect(() => {
    if (page > 1) getData(page);
  }, [page]);

  return (
    <div className="flex px-5 pb-20 pt-28 min-h-screen flex-col items-center justify-center md:px-20 xl:px-40">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-y-4 gap-x-3">
        {movies?.map((movie: MovieProps, index: number) => (
          <Card key={index} movie={movie} isScale="scale-105" />
        ))}
      </div>
      {!isLoading && (
        <button
          type="button"
          className="w-full py-2 text-lg mt-10 font-bold bg-white text-black"
          onClick={() => setPage((prev) => prev + 1)}
        >
          See More
        </button>
      )}
    </div>
  );
}
