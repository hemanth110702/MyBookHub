import React, { useState } from "react";
import AuthorSelector from "../components/createBook/AuthorSelector";
import GenreSelector from "../components/createBook/GenreSelector";
import AvSelector from "../components/createBook/AvSelector";
import {
  useAuthorStore,
  useAvStore,
  useGenreStore,
} from "../store/createbook-store";
import apiClient from "../services/apiClient";

const CreateBook = () => {
  const [coverImage, setCoverImage] = useState(false);
  const { authorList } = useAuthorStore();
  const { genreList, setError: setGenreListError } = useGenreStore();
  const { avList } = useAvStore();

  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleCancelImage = () => {
    setCoverImage(false);
    document.getElementById("coverImage").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (genreList.length == 0) {
      setGenreListError("Add atleast one genre");
    } else {
      const formData = new FormData(e.currentTarget);
      const title = formData.get("title");
      const authors = authorList;
      const description = formData.get("description");
      const genres = genreList;
      const visibility = formData.get("visibility");
      const allowedViewers = avList;
      const bookLink = formData.get("bookLink") || "";

      try {
        const formDataImg = new FormData();
        formDataImg.append("file", coverImage);
        formDataImg.append("upload_preset", "sdmcwiss");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/doosiuwwd/image/upload",
          {
            method: "POST",
            body: formDataImg,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to upload cover image");
        }

        const data = await response.json();
        const coverImageUrl = data.secure_url;

        console.log(coverImageUrl);

        const bookData = {
          title,
          authors,
          description,
          genres,
          visibility,
          allowedViewers,
          bookLink,
          coverImage: coverImageUrl,
        };
        apiClient.post("/api/books/", bookData);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <AuthorSelector />
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            required
          ></textarea>
        </div>
        <GenreSelector />
        <div>
          <label htmlFor="coverImage">Cover Image:</label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {coverImage && (
            <button type="button" onClick={handleCancelImage}>
              Cancel
            </button>
          )}
        </div>
        <div>
          <label htmlFor="visibility">Visibility:</label>
          <select name="visibility" id="visibility" required>
            <option value="public" defaultChecked>
              Public
            </option>
            <option value="private">Private</option>
            <option value="restricted">Restricted</option>
          </select>
        </div>
        <AvSelector />
        <div>
          <label htmlFor="bookLink">Book Link : </label>
          <input
            type="url"
            id="bookLink"
            name="bookLink"
            placeholder="Enter link to the book"
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;
