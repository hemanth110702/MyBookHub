import create from 'zustand';

export const useAuthStore = create((set) => ({
  user: (() => {
    const user = localStorage.getItem("myBookHubUser");
    return user ? JSON.parse(user) : null;
  })(),

  login: (user) => {
    localStorage.setItem("myBookHubUser", JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("myBookHubUser");
    set({ user: null });
  }
}));
