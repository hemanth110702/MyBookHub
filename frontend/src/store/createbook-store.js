import { create } from "zustand";

export const useGenreStore = create((set) => ({
  genreList: [],
  error: "",
  addToGenreList: (genre) =>
    set((state) => ({ genreList: [genre, ...state.genreList], error: "" })),
  removeFromGenreList: (genreIndex) =>
    set((state) => ({
      genreList: state.genreList.filter((_, idx) => idx != genreIndex)
    })),
  setError: (error) => set({ error }),
}));

export const useAuthorStore = create((set) => ({
  authorList: [],
  addToAuthorList: (author) =>
    set((state) => ({ authorList: [author, ...state.authorList] })),
  removeFromAuthorList: (authorIndex) =>
    set((state) => ({
      authorList: state.authorList.filter(
        (_, idx) => idx != authorIndex)
    })),
}));

export const useAvStore = create((set) => ({
  avList: [],
  addToAvList: (av) => set((state) => ({ avList: [av, ...state.avList] })),
  removeFromAvList: (avIndex) =>
    set((state) => ({
      avList: state.avList.filter((_, idx) => idx != avIndex)
    })),
}));