import { create } from "zustand";

export const useRecentBooks = create((set) => ({
  recentBooks: [],
  error: "",
  addToRecentBooks: (books) => set((_) => ({ recentBooks: [...books], error: "" })),
  setError: (error) => set({ error, addToRecentBooks: [] }),
}));

export const useTopBooks = create((set) => ({
  topBooks: [],
  error: "",
  addToTopBooks: (books) => set((_) => ({ topBooks: [...books], error: "" })),
  setError: (error) => set({ error, topBooks: [] }),
}));

export const useTopAuthors = create((set) => ({
  topAuthors: [],
  error: "",
  addToTopAuthors: (authors) => set({ topAuthors: [], error: "" }),
  setError: (error) => set({ error, topAuthors: [] }),
}))