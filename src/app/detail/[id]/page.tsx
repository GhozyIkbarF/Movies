"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchDetailMovie } from "@/service";
import { convertDate, convertTime } from "@/utils";
import { BsPlayFill } from "react-icons/bs";
import ReactPlayer from "react-player/lazy";

type Movie = {
  id: number;
  backdrop_path: string;
  poster_path: string | undefined;
  title: string;
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
    release_date: movie.release_date,
    runtime: movie.runtime,
    vote_average: movie.vote_average,
    overview: movie.overview,
    genres: movie.genres,
  };

  return data;
};

export default function Detail({ params: { id } }: { params: { id: string } }) {
  const [detail, setDetail] = useState<Movie | null>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const router = useRouter();

  const getData = async (id: number) => {
    const response = await fetchDetailMovie(id);
    const movie = object({ movie: response });
    setDetail({
      ...movie,
      videos: {
        results: response.videos.results.filter(
          (video: { type: string }) => video.type === "Trailer"
        )[0],
      },
      credits: { cast: response.credits.cast },
    });
  };

  useEffect(() => {
    getData(Number(id));
  }, [id]);

  return (
    <React.Fragment>
      <div
        className="relative w-full mt-16 min-h-max box-border"
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
          <div className="w-11/12 flex justify-center items-center px-[40px] py-[30px] box-border gap-10 flex-col md:flex-row">
            <div className="relative grid content-center w-[350px] h-[450px] overflow-hidden">
              <Image
                src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${detail?.poster_path}`}
                fill={true}
                sizes="(max-width: 300px)"
                alt={detail?.title ?? "poster"}
                className="rounded-md"
              />
            </div>
            <div className="w-full flex flex-wrap flex-col flex-start text-lg gap-10">
              <h1 className="font-bold text-6xl">{detail?.title}</h1>
              <Genres genres={detail?.genres ?? []} />
              <div className="flex gap-5 flex-col md:flex-row lg:flex-row">
                <p>Release: {convertDate(detail?.release_date ?? "")}</p>
                <p>Runtime: {convertTime(detail?.runtime ?? 0)}</p>
                <p>Rating: {detail?.vote_average}</p>
              </div>
              <p>{detail?.overview}</p>
              <div>
                <button
                  className="flex gap-2 items-center bg-amber-500 mt-8 py-2 px-4 hover:scale-105 transition-all"
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
                    src={`	https://www.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`}
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
    <div className="flex flex-col md:flex-row gap-2">
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
      onClick={() => handleToggleModal(false)}
    >
      <div className="w-full flex justify-center items-center">
        <div className="w-full h-96 bg-white md:h-[550px] md:w-3/4">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${url}`}
            controls={true}
            loop={false}
            playing={isModal}
            width="100%"
            height="100%"
            // onPause={}
          />
        </div>
      </div>
    </div>
  );
};
