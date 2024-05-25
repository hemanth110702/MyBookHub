import React, { useState } from "react";
import { bookGenres } from "../../static/bookGenres";
import { useGenreStore } from "../../store/createbook-store";

const GenreSelector = () => {
  const { genreList, addToGenreList, removeFromGenreList, error } =
    useGenreStore();
  const [genreSearchQuery, setGenreSearchQuery] = useState("");
  const [genreSearchResults, setGenreSearchResults] = useState([]);

  const handleGenreSearch = (query) => {
    const searchGenreList = [];
    bookGenres.forEach((genre) => {
      if (
        searchGenreList.length < 5 &&
        genre.toLowerCase().includes(query.toLowerCase())
      ) {
        searchGenreList.push(genre);
      }
    });
    setGenreSearchResults(searchGenreList);
  };

  const handleGenreChange = (e) => {
    setGenreSearchQuery(e.target.value);
    handleGenreSearch(e.target.value);
  };

  const handleGenresList = (genre) => {
    addToGenreList(genre);
    setGenreSearchQuery("");
    setGenreSearchResults([]);
  };

  return (
    <div>
      <label htmlFor="genres">Genres:</label>
      <input
        type="text"
        id="genres"
        name="genres"
        value={genreSearchQuery}
        onChange={handleGenreChange}
        placeholder="select genres"
      />
      {error && <div>{error}</div>}
      <ul className="bg-blue-700 w-max">
        {genreSearchQuery &&
          genreSearchResults &&
          genreSearchResults.map((result, index) => (
            <li
              key={index}
              onClick={() => {
                if (!genreList.includes(result))
                  return handleGenresList(result);
              }}
              className={`bg-${
                genreList.includes(result) ? "green" : "black"
              }-800`}
            >
              {result}
            </li>
          ))}
      </ul>
      {genreList &&
        genreList.map((genre, index) => (
          <div key={index} className="flex ">
            <div>{genre}</div>
            <button onClick={() => removeFromGenreList(index)}>x</button>
          </div>
        ))}
    </div>
  );
};

export default GenreSelector;
