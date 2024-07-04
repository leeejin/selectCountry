import { useEffect, useState } from "react";

interface PaginationProps {
  itemCount: number;
  itemCountPerPage: number;
  pageCountPerPage: number;
  clickListener: (page: number) => void;
}
interface NumberingProps {
  page: number;
  currentPage: number;
  clickListener: (page: number) => void;
}

const Pagination = ({
  itemCount,
  itemCountPerPage,
  pageCountPerPage,
  clickListener,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(pageCountPerPage); //5

  const maxPage = Math.ceil(itemCount / itemCountPerPage); //17
  const pages = Array.from({ length: maxPage + 1 }, (_, i) => i);

  useEffect(() => {
    if (maxPage < pageCountPerPage) {
      setEndPage(maxPage);
    }
  }, [maxPage, pageCountPerPage]);

  const leftPageClicked = (): void => {
    setCurrentPage(
      startPage - pageCountPerPage >= 1
        ? currentPage - pageCountPerPage
        : startPage - 1
    );
    setStartPage(getStartPage());
    setEndPage(getStartPage() + pageCountPerPage - 1);
    clickListener(currentPage);
  };

  const rightPageClicked = (): void => {
    setCurrentPage(
      endPage + pageCountPerPage < maxPage
        ? currentPage + pageCountPerPage
        : startPage + pageCountPerPage
    );
    setStartPage(startPage + pageCountPerPage);
    setEndPage(getEndPage());
    clickListener(currentPage);
  };

  const pageNumberClicked = (page: number): void => {
    setCurrentPage(page);
    clickListener(page);
  };

  const getStartPage = (): number => {
    return startPage - pageCountPerPage > 1 ? startPage - pageCountPerPage : 1;
  };

  const getEndPage = (): number => {
    return endPage + pageCountPerPage < maxPage
      ? endPage + pageCountPerPage
      : maxPage;
  };

  return (
    <div>
      <button onClick={leftPageClicked} disabled={startPage === 1}>
        &lt;
      </button>
      {pages.slice(startPage, endPage + 1).map((page, i) => (
        <Numbering
          key={i}
          page={page}
          currentPage={currentPage}
          clickListener={pageNumberClicked}
        />
      ))}
      <button onClick={rightPageClicked} disabled={endPage === maxPage}>
        &gt;
      </button>
    </div>
  );
};

const Numbering = ({ page, currentPage, clickListener }: NumberingProps) => {
  return (
    <button
      onClick={() => clickListener(page)}
      style={{
        fontWeight: page === currentPage ? "bold" : "normal",
      }}
    >
      {page}
    </button>
  );
};

export default Pagination;
