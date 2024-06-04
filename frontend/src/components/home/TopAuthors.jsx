import React, { useEffect } from "react";
import { useTopAuthors } from "../../store/homebook-store";
import apiClient from "../../services/apiClient";

const TopAuthors = () => {
  const {
    topAuthors,
    addToTopAuthors,
    error: topAuthorsError,
    setError: setTopAuthorsError,
  } = useTopAuthors();

  const getTopAuthors = async() => {
    try {
      const topA = await apiClient.get("/api/books/topauthors");
      addToTopAuthors(topA.data);
    } catch(err) {
      console.log(err);
      setTopAuthorsError(err);
    }
  }

  useEffect(()=>{
    getTopAuthors();
  }
  ,[])


  return <div>TopAuthors</div>;
};

export default TopAuthors;
