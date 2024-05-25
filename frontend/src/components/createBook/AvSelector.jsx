import React, { useState } from "react";
import apiClient from "../../services/apiClient";
import { useAvStore } from "../../store/createbook-store";

const AvSelector = () => {
  const { avList, addToAvList, removeFromAvList } = useAvStore();
  const [avSearchQuery, setAvSearchQuery] = useState("");
  const [avSearchResults, setAvSearchResults] = useState([]);

  const handleAvSearch = async (query) => {
    try {
      const response = await apiClient.get(
        `/api/authors/search?query=${query}`
      );
      setAvSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleAvChange = (e) => {
    setAvSearchQuery(e.target.value);
    handleAvSearch(e.target.value);
  };

  const handleAvList = (genre) => {
    addToAvList(genre);
    setAvSearchQuery("");
    setAvSearchResults([]);
  };

  return (
    <div>
      <label htmlFor="allowedViewers">Allowed Viewers:</label>
      <input
        type="text"
        id="allowedViewers"
        name="allowedViewers"
        value={avSearchQuery}
        onChange={handleAvChange}
        placeholder="Enter the username to allow"
      />
      <ul className="bg-blue-700 w-max">
        {avSearchQuery &&
          avSearchResults &&
          avSearchResults.map((result, index) => (
            <li
              key={index}
              onClick={() => {
                if (!avList.includes(result.username))
                  return handleAvList(result.username);
              }}
              className={`bg-${
                avList.includes(result.username) ? "green" : "black"
              }-800`}
            >
              {result.username}
            </li>
          ))}
      </ul>
      {avList &&
        avList.map((username, index) => (
          <div key={index} className="flex ">
            <div>{username}</div>
            <button onClick={() => removeFromAvList(index)}>x</button>
          </div>
        ))}
    </div>
  );
};

export default AvSelector;
