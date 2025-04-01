import { useState } from "react";
import { MovieList } from "../../components/MovieList/MovieList";
import { Aside } from "../../components/Aside/Aside";
import { Pagination } from "../../components/Paginacion/Paginacion";

export const ContentContainer = ({ type }) => {
  const [page, setPage] = useState(1);
  const [currentGenre, setCurrentGenre] = useState(28);
  return (
    <div>
      <div className="flex justify-center">
        <Aside currentGenre={currentGenre} setCurrentGenre={setCurrentGenre} />
        <MovieList type={type} page={page} currentGenre={currentGenre} />
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};
