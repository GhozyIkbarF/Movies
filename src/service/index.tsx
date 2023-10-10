import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Options {
  isRevalidate?: boolean;
}

const options = (props: Options = {}) => {
  const option: any = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + API_KEY,
    },
  };

  if (props.isRevalidate) option.revalidate = 60;

  return option;
};

async function fetchData(route: string, props: Options = {}) {
  const response = await fetch(`${API_URL}${route}`, options(props),);
  const data = await response.json();
  return data;
}

const fetchPopularMovie = () => fetchData('movie/top_rated?language=en-US&page=1');
const fetchRecomendationsMovie = () => fetchData('movie/now_playing?language=en-US&page=1');
const searchMovie = (param: string) => fetchData(`search/movie?query=${param}&include_adult=false&language=en-US&page=1`)
const fetchDetailMovie = (id: number, props: Options = {}) => fetchData(`movie/${id}?language=en-US&append_to_response=videos,credits`, props)

export { fetchDetailMovie, fetchRecomendationsMovie, fetchPopularMovie, searchMovie }