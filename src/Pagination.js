import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  items: PropTypes.arrary.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
};

const defaultProps = {
  initialPage: 1,
  pageSize: 10,
};

function Pagination(props) {
  const [page, setPage] = useState({ pager: {} });
  useEffect(() => {
    if (props.items && props.items.length) {
      setPage(props.initialPage);
    }
  });
  const getPager = (items, currentPage, pageSize) => {
    currentPage = currentPage || 1;
    pageSize = pageSize || 10;
    const totalPages = Math.ceil(items / pageSize);
    let startPage, endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, items - 1);

    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    return {
      items,
      currentPage,
      pageSize,
      startPage,
      endPage,
      totalPages,
      startPage,
      endIndex,
      pages,
    };
  };

  const handlePageChange = (pageNo) => {
    const pager = page.pager;
    if (pageNo < 1 || pager.totalPages) return;
    pager = getPager(items.length, pageNo, pageSize);
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    setPage({ pager });
    onChangePage(pageOfItems);
  };

  return (
    <div>
      <ul className="pagination">
        <li className={pager.currentPage === 1 ? "disabled" : ""}>
          <a onClick={() => setPage(1)}>First</a>
        </li>
        <li className={pager.currentPage === 1 ? "disabled" : ""}>
          <a onClick={() => setPage(pager.currentPage - 1)}>Previous</a>
        </li>
        {pager.pages.map((pageNo, index) => (
          <li
            key={index}
            className={pager.currentPage === pageNo ? "active" : ""}
          >
            <a onClick={() => setPage(pageNo)}>{pageNo}</a>
          </li>
        ))}
        <li
          className={pager.currentPage === pager.totalPages ? "disabled" : ""}
        >
          <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
        </li>
        <li
          className={pager.currentPage === pager.totalPages ? "disabled" : ""}
        >
          <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
