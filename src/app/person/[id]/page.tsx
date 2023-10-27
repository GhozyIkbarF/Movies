"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchPerson } from "@/service";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import "swiper/css";
import Link from "next/link";

type Movie = {
  id: number;
  name: string;
  profile_path: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  gender: number;
  popularity: number;
  external_ids: {
    id: number;
    wikidata_id: string;
    facebook_id: string;
    instagram_id: string;
    tiktok_id: string;
    twitter_id: string;
    youtube_id: string;
  };
  movie_credits: {
    cast: { id: number; title: string; poster_path: string }[];
  };
};

const object = ({ movie }: { movie: Movie }) => {
  const data = {
    id: movie.id,
    name: movie.name,
    profile_path: movie.profile_path
      ? `	https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.profile_path}`
      : "",
    biography: movie.biography,
    birthday: movie.birthday,
    place_of_birth: movie.place_of_birth,
    gender: movie.gender,
    popularity: movie.popularity,
    external_ids: { ...movie.external_ids },
    movie_credits: { cast: [...movie.movie_credits.cast] },
  };
  return data;
};

export default function Person({ params: { id } }: { params: { id: string } }) {
  const [detail, setDetail] = useState<Movie | undefined>();
  const router = useRouter();

  const getData = async (id: number) => {
    const response = await fetchPerson(id);
    console.log(response);
    const movie = object({ movie: response });
    setDetail({ ...movie }); // add empty string as default value for overview property
  };

  useEffect(() => {
    getData(Number(id));
  }, [id]);

  return (
    <React.Fragment>
      <div className="relative w-full min-h-max box-border py-28">
        <div className="w-full flex flex-wrap justify-center">
          <div className="w-11/12 flex flex-col justify-center items-center px-5 py-[30px] box-border gap-10 md:flex-row md:px-[45px] md:items-start">
            <div className="relative flex content-center w-[330px] h-[450px] md:w-[370px] md:h-[500px] overflow-hidden">
              <Image
                src={detail?.profile_path ?? ""}
                fill={true}
                sizes="(max-width: 400px)"
                alt={"poster" + detail?.name ?? "poster"}
                priority={true}
                className="rounded-lg"
              />
            </div>
            <div className="w-full lg:w-4/6 flex justify-start flex-col text-lg gap-6 md:pr-32">
              <h1 className="font-bold text-3xl md:text-6xl">{detail?.name}</h1>
              <div>
                <p className="font-bold text-xl mb-2">Biography</p>
                <p className="text-sm md:text-md">{detail?.biography ?? "-"}</p>
              </div>
              <div className="w-full flex-col">
                <p className="font-bold text-xl mb-2">Role</p>
                <div className="w-full flex min-h-max overflow-x-auto scrollbar-thin gap-2" style={{ scrollbarWidth: "initial" }}>
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    scrollbar={{
                      hide: false,
                  }}
                    breakpoints={{
                      375: {
                        slidesPerView: 2,
                      },
                      400: {
                        slidesPerView: 3,
                      },
                      640: {
                        slidesPerView: 4,
                      },
                      768: {
                        slidesPerView: 4,
                      },
                      1034: {
                        slidesPerView: 5,
                      },
                    }}
                    modules={[Scrollbar]}
                    className="mySwiper"
                  >
                    {/* <Role role={detail?.movie_credits.cast ?? []} /> */}
                    {detail?.movie_credits.cast &&
                      detail?.movie_credits.cast.map((movie, index) => (
                        <div key={movie.id}>
                          <SwiperSlide>
                            <Link 
                              href={`/detail/${movie.id}`}
                              rel="preload"
                              className="rounded-lg cursor-pointer"
                              // onClick={() => router.push(`/detail/${movie.id}`)}
                            >
                              <div className="relative w-[143px] h-[175px] rounded-t-lg">
                                <Image
                                  src={
                                    movie.poster_path
                                      ? `https://www.themoviedb.org/t/p/w138_and_h175_face${movie.poster_path}`
                                      : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                                  }
                                  fill={true}
                                  sizes="(max-width: 143px)"
                                  alt={`profile ${movie.title}`}
                                  priority={true}
                                  className="rounded-t-lg"
                                />
                              </div>
                              <div className="p-1 w-[143px] text-sm">
                                <p>{movie.title}</p>
                              </div>
                            </Link>
                          </SwiperSlide>
                        </div>
                      ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

type Role = {
  id: number;
  title: string;
  poster_path: string;
}[];

const Role = ({ role }: { role: Role }) => {
  const router = useRouter();
  return (
    <React.Fragment>
      {role &&
        role.map((movie, index) => (
          <SwiperSlide>
            <div
              className="rounded-lg cursor-pointer"
              key={index}
              onClick={() => router.push(`/detail/${movie.id}`)}
            >
              <div className="relative w-[143px] h-[175px] rounded-t-lg">
                <Image
                  src={
                    movie.poster_path
                      ? `https://www.themoviedb.org/t/p/w138_and_h175_face${movie.poster_path}`
                      : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                  }
                  fill={true}
                  sizes="(max-width: 143px)"
                  alt={`profile ${movie.title}`}
                  priority={true}
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-1 w-[143px] text-sm">
                <p>{movie.title}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </React.Fragment>
  );
};
