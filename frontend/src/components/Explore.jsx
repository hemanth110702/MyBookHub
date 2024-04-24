import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useBookStore } from "../store/book-store";

const Explore = () => {
  const { books, addToBooks, clearBooks } = useBookStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("decdi");
    const fetchBooks = async () => {
      setLoading(true);
      try {
        clearBooks();
        const response = await apiClient.get("/api/books/");
        console.log(response);
        const { data } = response;
        console.log(data);
        data.forEach((book) => addToBooks(book));
      } catch (err) {
        console.error("error fetching books", err);
      }
      setLoading(false);
    };
    fetchBooks();
    console.log("Books are here", books);
  }, [addToBooks, clearBooks]);

  return (
    <div className="bg-blue-200">
      {loading ? (
        <div>Loading...</div>
      ) : books.length ? (
        books.map((book, index) => <div key={index}>{book.title}</div>)
      ) : (
        <div>No books </div>
      )}
    </div>
  );
};

export default Explore;
