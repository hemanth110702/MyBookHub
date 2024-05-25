import React, { useState } from "react";
import apiClient from "../../services/apiClient";
import { useAuthorStore } from "../../store/createbook-store";

const AuthorSelector = () => {
  const { authorList, addToAuthorList, removeFromAuthorList } =
    useAuthorStore();
  const [authorSearchQuery, setAuthorSearchQuery] = useState("");
  const [authorSearchResults, setAuthorSearchResults] = useState([]);

  const handleAuthorSearch = async (query) => {
    try {
      const response = await apiClient.get(
        `/api/authors/search?query=${query}`
      );
      setAuthorSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleAuthorChange = (e) => {
    setAuthorSearchQuery(e.target.value);
    handleAuthorSearch(e.target.value);
  };

  const handleAuthorsList = (username) => {
    addToAuthorList(username);
    setAuthorSearchQuery("");
    setAuthorSearchResults([]);
  };

  return (
    <div>
      <label htmlFor="authors">Authors:</label>
      <input
        type="text"
        value={authorSearchQuery}
        onChange={handleAuthorChange}
        placeholder="Search author..."
      />
      <ul className="bg-blue-700 w-max">
        {authorSearchQuery &&
          authorSearchResults &&
          authorSearchResults.map((result, index) => (
            <li
              key={index}
              onClick={() => {
                if (!authorList.includes(result.username))
                  return handleAuthorsList(result.username);
              }}
              className={`bg-${
                authorList.includes(result.username) ? "green" : "black"
              }-800`}
            >
              {result.username}
            </li>
          ))}
      </ul>
      {authorList &&
        authorList.map((username, index) => (
          <div key={index} className="flex ">
            <div>{username}</div>
            <button onClick={() => removeFromAuthorList(index)}>x</button>
          </div>
        ))}
    </div>
  );
};

export default AuthorSelector;
