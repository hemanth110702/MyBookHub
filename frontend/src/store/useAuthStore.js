import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  registrationFormData: {
    username: "",
    email: "",
    password: "",
  },
  loginFormData: {
    email: "",
    password: "",
  },
  usernameFeedback: {
    available: false,
    feedback: "",
  },
  registerFeedback: {
    error: false,
    feedback: "",
  },
  setRegisterFeedback: (updateFeedback) => set({ registerFeedback: updateFeedback }),
  setUsernameFeedback: (updatedFeedback) => set({ usernameFeedback: updatedFeedback }),
  setRegistrationFormData: (newFormData) => set((state) => ({
    registrationFormData: { ...state.registrationFormData, ...newFormData },
  })),
  setLoginFormData: (newFormData) => set({ loginFormData: newFormData })
}));
