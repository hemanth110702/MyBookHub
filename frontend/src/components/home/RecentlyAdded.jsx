import React, { useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useRecentBooks } from "../../store/homebook-store";

const RecentlyAdded = () => {
  const {
    addToRecentBooks,
    recentBooks,
    setError: setRecentBooksError,
    error: recentBooksError,
  } = useRecentBooks();

  const findRecentBooks = async () => {
    try {
      const res = await apiClient.get("/api/books/recentbooks");
      addToRecentBooks(res.data);
    } catch (err) {
      console.log("Error finding books : ", err);
      setRecentBooksError("Error fetching books!!!");
    }
  };

  useEffect(() => {
    findRecentBooks();
  }, []);

  return (
    <div>
      RecentlyAdded
      {recentBooksError && <div>Error fetching books!!</div>}
      {recentBooks.length === 0 && !recentBooksError && (
        <div>No recent books found.</div>
      )}
      {recentBooks &&
        recentBooks.map((book, index) => (
          <div key={index}>
            <p>
              {index + 1}.{book.title}
            </p>
          </div>
        ))}
    </div>
  );
};

export default RecentlyAdded;
