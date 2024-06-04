import { create } from "zustand";

export const useDisplayBook = create((set) => ({
  bookDisplay: {},
  error: "",
  addToBookDisplay: (book) => set((_) => ({ bookDisplay: book, error: "" })),
  setError: (error) => set({ error, addToBookDisplay: {} })
}));