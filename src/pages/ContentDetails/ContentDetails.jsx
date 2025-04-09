import React, { useEffect, useState } from "react";
import { useParams } from "wouter";
import { getMovieById, getSerieById } from "../../api/functions-api";
import "./ContentDetails.css";

export const ContentDetails = ({ type }) => {
  let { id } = useParams();
  const [data, setData] = useState({});

  console.log(type);

  const title = data.title ? data.title : data.name;

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
    <section className="flex mt-20 items-center bg-red-50 justify-center gap-6">
      <img
        className="h-102"
        src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
        alt={`poster de ${data.title}`}
      />
      <div className="flex flex-col gap-6 self-start mt-2">
        <h2 className="font-medium text-xl">{title}</h2>
        <p className="w-60">{data.overview}</p>
      </div>
    </section>
  );
};
