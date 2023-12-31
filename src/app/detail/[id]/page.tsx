"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchDetailMovie } from "@/service";
import { convertDate, convertTime } from "@/utils";
import { BsPlayFill } from "react-icons/bs";
import ReactPlayer from "react-player/lazy";
import SkeletonDetailMovie from "@/components/skeleton/SkeletonDetailMovie";

type Movie = {
  id: number;
  backdrop_path: string;
  poster_path: string | undefined;
  title: string;
  tagline: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  overview: string;
  genres: { id: number; name: string }[];
  videos?: { results: { key: string; type: string } };
  credits?: {
    cast: {
      id: number;
      character: string;
      name: string;
      profile_path: string;
    }[];
  };
};

const object = ({ movie }: { movie: Movie }) => {
  const data = {
    id: movie.id,
    backdrop_path: movie.backdrop_path
      ? `${movie.backdrop_path}`
      : "",
    poster_path: movie.poster_path
      ? `${movie.poster_path}`
      : "",
    title: movie.title,
    tagline: movie.tagline,
    release_date: movie.release_date,
    runtime: movie.runtime,
    vote_average: movie.vote_average,
    overview: movie.overview,
    genres: movie.genres,
  };

  return data;
};

export default function Detail({ params: { id } }: { params: { id: string | number } }) {
  const [detail, setDetail] = useState<Movie | null>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const getData = async (id: number) => {
    setIsLoading(true)
    try {
      const response = await fetchDetailMovie(id);
      const movie = object({ movie: response });
      setDetail({
        ...movie,
        videos: {
          results: response.videos.results.filter(
            (video: { type: string }) => video.type === "Trailer"
          )[0],
        },
        credits: { cast: response.credits?.cast ?? [] },
      });
    } catch (error: unknown) {
      throw new Error(
        typeof error === "string" ? error : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getData(Number(id));
  }, [id]);
  
  if(isLoading) return <SkeletonDetailMovie />
  // if(isLoading) return <div className="min-h-screen w-full flex justify-center items-center">Loading...</div>
  return (
    <React.Fragment>
      <div
        className="relative w-full mt-24 lg:mt-16 min-h-max box-border"
        style={{
          backgroundPosition: "left calc((50vw - 170px) - 370px) top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${detail?.backdrop_path}")`,
        }}
      >
        <div
          className="w-full h-full flex flex-wrap justify-center content-center"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%)",
          }}
        >
          <div className="w-11/12 flex justify-center items-center px-[40px] py-[30px] box-border gap-10 lg:gap-8 flex-col md:flex-row">
            <div className="relative grid content-center w-[350px] h-[450px] overflow-hidden">
              <Image
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${detail?.poster_path ?? ''}`}
                fill={true}
                sizes="(max-width: 300px)"
                alt={detail?.title ?? "poster"}
                className="rounded-md"
              />
            </div>
            <div className="w-full flex flex-wrap flex-col flex-start text-lg gap-5 lg:gap-10">
              <h1 className="font-bold text-6xl">{detail?.title}</h1>
              <Genres genres={detail?.genres ?? []} />
              <div className="flex lg:gap-5 flex-col md:flex-row lg:flex-row">
                <p>Release: {convertDate(detail?.release_date ?? "")}</p>
                <p>Runtime: {convertTime(detail?.runtime ?? 0)}</p>
                <p>Rating: {detail?.vote_average}</p>
              </div>
              <p className="italic tracking-wider">{detail?.tagline}</p>
              <p>{detail?.overview}</p>
              <div>
                <button
                  className="flex gap-2 items-center bg-amber-500 mt-5 lg:mt-0 py-2 px-4 hover:scale-105 transition-all"
                  onClick={() => setShowModal(true)}
                >
                  <span className="text-2xl">
                    <BsPlayFill />
                  </span>{" "}
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
        {detail?.videos?.results.key && (
          <Modal
            isModal={showModal}
            url={detail.videos.results.key}
            onClick={setShowModal}
          />
        )}
      </div>
      <div className="w-full my-10 px-8">
        <h1 className="font-bold text-4xl mb-2">Actors</h1>
        <div className="flex w-full min-h-max overflow-x-auto gap-2" style={{ scrollbarWidth: "none" }}>
          {detail?.credits?.cast &&
            detail.credits.cast.map((actor, index) => (
              <div className="cursor-pointer" key={index} onClick={() => router.push(`/person/${actor.id}`)}>
                <div className="relative w-[143px] h-[175px] rounded-t-lg">
                  <Image
                    src={`https://www.themoviedb.org/t/p/w138_and_h175_face${actor?.profile_path}`}
                    fill={true}
                    sizes="(max-width: 143px)"
                    alt={`profile ${actor.name}`}
                    priority={true}
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-1 w-[143px]">
                  <h1 className="font-bold">{actor.name}</h1>
                  <p>{actor.character}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
}
const Genres = ({ genres }: { genres: { id: number; name: string }[] }) => {
  return (
    <div className="flex gap-2">
      {genres &&
        genres.map((genre: { id: number; name: string }, index) => (
          <p key={genre.id}>{index !== 0 ? `| ${genre.name}` : genre.name}</p>
        ))}
    </div>
  );
};
const Modal = ({
  isModal,
  url,
  onClick,
}: {
  isModal: boolean;
  url: string;
  onClick: (param: boolean) => void;
}) => {
  const handleToggleModal = (param: boolean) => {
    onClick(param);
  };

  return (
    <div
      className={`fixed top-0 w-full min-h-screen flex flex-col justify-center items-center bg-black bg-opacity-70 ${
        isModal ? "block z-50" : "hidden"
      }`}
    >
      <div className="w-full flex justify-center items-center">
        <div className="w-full bg-black md:w-3/4">
        <div className="w-full flex justify-between items-center h-16 px-5 box-border">
          <h1 className="font-bold text-base lg:text-xl">Play Trailer</h1>
          <button
            className="text-3xl"
            onClick={() => handleToggleModal(false)}
          >
            &times;
          </button>
        </div>
        <div className="w-full h-96 bg-white md:h-[550px]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${url}`}
              controls={true}
              loop={false}
              playing={isModal}
              width="100.02%"
              height="100%"
              // onPause={}
            />
        </div>
        </div>
      </div>
    </div>
  );
};
