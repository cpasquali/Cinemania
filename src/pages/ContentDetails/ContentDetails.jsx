import React, { useEffect, useState } from "react";
import { useParams } from "wouter";
import { getMovieById, getSerieById } from "../../api/functions-api";
import "./ContentDetails.css";

export const ContentDetails = ({ type }) => {
  let { id } = useParams();
  const [data, setData] = useState({});

  const title = data.title ? data.title : data.name;
  const overview = data.overview
    ? data.overview
    : "Este contenido no tiene informacion registrada";
  const classOverview = data.overview ? "" : "text-center";

  const fetchData = async () => {
    let data = "";
    if (type === "movie") {
      data = await getMovieById(id);
    } else {
      data = await getSerieById(id);
    }
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section
      className="details-container flex mt-16 items-center bg-red-50 justify-center gap-6 relative max-md:flex-col pb-4 py-4"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <img
        className="h-102 z-10 rounded-md"
        src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
        alt={`poster de ${data.title}`}
      />
      <div className="flex flex-col items-center gap-6 mt-2 z-10">
        <h2 className="font-medium text-xl text-white">{title}</h2>
        <p className={`w-120 max-md:w-70  text-white ${classOverview}`}>
          {overview}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-42 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};
