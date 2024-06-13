import { useEffect } from "react";
import apiClient from "../services/apiClient";
import { useDisplayBook } from "../store/displaybook-store";
import { useParams } from "react-router-dom";

const BookDisplay = () => {
  const {bookname} = useParams();
  const {
    bookDisplay: book,
    addToBookDisplay,
    error: bookDisplayError,
    setError: setBookDisplayError,
  } = useDisplayBook();

  const getTheBook = async () => {
    try {
      const response = await apiClient.get(
        `api/books/decider/${bookname.replace(/_/g, " ")}`
      );
      console.log(response.data);
      addToBookDisplay(response.data);
    } catch (error) {
      console.error("Error fetching the book:", error);
      setBookDisplayError("Error fetching book");
    }
  };

  useEffect(() => {
    getTheBook();
  }, []);

  return (
    <div>
      <p>BookDisplay</p>
      {bookDisplayError && <div>{bookDisplayError}</div>}
      {book && (<div>
        <img src={book.coverImage} alt="book image" width={100} height={100}/>
        <p>Starred: {book.starred?.length ?? 0 }</p>
        <p>Title: {book.title}</p>
        <p>Authors: {book.authors?.join(', ')} </p>    
        <p>Genres: {book.genres?.join(', ')} </p>    
        <p>Description: {book.description}</p>
        <p>Book Link: {book.bookLink}</p>
        {/* license
        bookComments
        bookActivity
        last updated
        created */}
      </div>)}
    </div>
  );
};

export default BookDisplay;
