import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  registrationFormData: {
    fullName: "",
    username: "",
    email: "",
    password: "",
  },
  loginFormData: {
    email: "",
    password: "",
  },
  setUsernameFeedback: (updatedFeedback) => set({ usernameFeedback: updatedFeedback }), 
  usernameFeedback: {
    available: false,
    feedback: "",
  },
  setRegistrationFormData: (newFormData) => set({ registrationFormData: newFormData }), 
  setLoginFormData: (newFormData) => set({ loginFormData: newFormData }) 
}));
