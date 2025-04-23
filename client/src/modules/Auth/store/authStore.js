import { create } from "zustand";
import { functions } from "../../../../firebase";
import { httpsCallable } from "firebase/functions";

const useAuthStore = create((set) => ({
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  loading: false,
  error: null,

  checkPassword: async (password) => {
    set({ loading: true, error: null });
    try {
      if (!password || typeof password !== "string") {
        throw new Error("Password must be a non-empty string");
      }
      const passwordStr = password.trim();
      if (!passwordStr) {
        throw new Error("Password cannot be empty");
      }

      const checkPasswordFunction = httpsCallable(functions, "checkPassword");
      const result = await checkPasswordFunction({ password: passwordStr });
      if (result.data.success) {
        set({ isAuthenticated: true, loading: false });
        localStorage.setItem("isAuthenticated", "true");
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Error in checkPassword:", error);
      const errorMessage = error.message || "Ошибка аутентификации";
      set({ error: errorMessage, loading: false });
      throw errorMessage; 
    }
  },

  logout: () => {
    set({ isAuthenticated: false, error: null });
    localStorage.removeItem("isAuthenticated");
  },
}));

export default useAuthStore;