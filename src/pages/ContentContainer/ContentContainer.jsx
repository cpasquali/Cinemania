import { useState } from "react";
import { CardsContainer } from "../../components/CardsContainer/CardsContainer";
import { GenreScrollBar } from "../../components/GenreScrollBar/GenreScrollBar";
import { Pagination } from "../../components/Paginacion/Paginacion";

export const ContentContainer = ({ type }) => {
  const [page, setPage] = useState(1);
  const [currentGenre, setCurrentGenre] = useState(16);
  console.log(currentGenre);
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <GenreScrollBar
          currentGenre={currentGenre}
          setCurrentGenre={setCurrentGenre}
          type={type}
        />
        <CardsContainer type={type} page={page} currentGenre={currentGenre} />
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};
