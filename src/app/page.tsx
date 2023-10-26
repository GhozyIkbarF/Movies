'use client';
import { useState, useEffect } from 'react';
import { MovieProps } from '@/components/Card'
import { ListMovieProps } from '@/components/ListMovies';
import { fetchPopularMovie, fetchTopRatedMovie, fetchNowPlaying, fetchUpComing  } from '@/service'
import ListMovies from '@/components/ListMovies';



// async function getData() {
//   try {
//     const response = await fetchPopularMovie()
//     const movies = response?.results.map((movie: MovieProps) => {
//       return {
//         id: movie.id,
//         poster_path: `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`,
//         title: movie.title,
//         release_date: movie.release_date,
//         vote_average: movie.vote_average,
//       }
//     })
//     return movies
//   } catch (error) {
//     console.log(error)
//   }
// }

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<MovieProps[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<MovieProps[]>([])
  const [NowPlayingMovies, setNowPlayingMovies] = useState<MovieProps[]>([])
  const [upComingMovies, setUpComingMovies] = useState<MovieProps[]>([])

  const setData = ({results}: {results: ListMovieProps}) => {
    console.log(results);
    const movies = results?.map((movie: MovieProps) => {
      return {
        id: movie.id,
        poster_path: `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`,
        title: movie.title,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      }
    })
    return movies
  } 
  async function getData(page:number) {
    try {
      const [popularMovies, topRatedMovies, recommendedMovies, upComingMovies] = await Promise.all([fetchPopularMovie({page}), fetchTopRatedMovie({page}), fetchNowPlaying({page}), fetchUpComing({page})])

      const popular = setData({results: popularMovies.results})
      const topRated = setData({results: topRatedMovies.results})
      const nowPlaying = setData({results: recommendedMovies.results})
      const upComing = setData({results: upComingMovies.results})
      setPopularMovies(popular)
      setTopRatedMovies(topRated)
      setNowPlayingMovies(nowPlaying)
      setUpComingMovies(upComing)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData(1);
  },[])
  return (
    <main className="flex px-5 py-28 min-h-screen flex-col items-center justify-between md:px-20 lg:px-32 xl:px-40">
      <ListMovies movie={popularMovies} title='Popular Movies' href='/movie'/>
      <ListMovies movie={topRatedMovies} title='Top Rated Movies' href='/movie/top-rated'/>
      <ListMovies movie={NowPlayingMovies} title='Now Playing Movies' href='/movie/now-playing'/>
      <ListMovies movie={upComingMovies} title='Up Coming Movies' href='/movie/upcoming'/>
    </main>
  )
}


