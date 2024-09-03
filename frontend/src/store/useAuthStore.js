import create from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("myBookHubUser")),

  login: (user) => {
    localStorage.setItem("myBookHubUser", JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("myBookHubUser");
    set({ user: null });
  }

}))