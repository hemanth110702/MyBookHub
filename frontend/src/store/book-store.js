import { create } from "zustand";

export const useBookStore = create((set) => ({
  books: [],
  addToBooks: (book) => set((state) => ({ books: [...state.books, book] })),
  clearBooks: () => set({ books: [] }),
}));