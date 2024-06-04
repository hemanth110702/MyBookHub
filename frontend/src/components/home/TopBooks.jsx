import React, { useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useTopBooks } from "../../store/homebook-store";

const TopBooks = () => {
  const {
    topBooks,
    addToTopBooks,
    error: topBooksError,
    setError: setTopBooksError,
  } = useTopBooks();
  const getTopBooks = async () => {
    try {
      const topB = await apiClient.get("/api/books/topbooks");
      addToTopBooks(topB.data);
    } catch (err) {
      console.log(err);
      setTopBooksError("Failed to load Top Books");
    }
  };

  useEffect(() => {
    getTopBooks();
  }, []);
  return <div>
    <p>Top Books</p>
    {topBooksError && <div>{topBooksError}</div>}
    {topBooks && topBooks.map((book, index)=>(<div key={index}>{book.title}</div>))}
  </div>;
};

export default TopBooks;
