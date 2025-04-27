import { create } from "zustand";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../../../firebase";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  isAdmin: false,
  loading: true,
  error: null,

  initializeAuth: () => {
    set({ loading: true });
    const authInstance = getAuth();
    onAuthStateChanged(authInstance, async (user) => {
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();
          const isAdmin = tokenResult.claims.role === "admin";
          set({
            isAuthenticated: true,
            isAdmin,
            loading: false,
            error: null,
          });
          
        } catch (error) {
          console.error("Error checking token:", error);
          set({
            isAuthenticated: false,
            isAdmin: false,
            loading: false,
            error: "Failed to verify authentication",
          });
        }
      } else {
        set({
          isAuthenticated: false,
          isAdmin: false,
          loading: false,
          error: null,
        });
      }
    });
  },

  login: async (password, role = "default") => {
    set({ loading: true, error: null });
    try {
      if (!password) {
        throw new Error("password is required");
      }

      let email;
      if (role === "admin") {
        email = import.meta.env.VITE_ADMIN_USER_EMAIL;
      } else {
        email = import.meta.env.VITE_DEFAULT_USER_EMAIL;
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const tokenResult = await user.getIdTokenResult();
      const isAdmin = tokenResult.claims.role === "admin";

      set({ isAuthenticated: true, isAdmin, loading: false, error: null });
      return { success: true };
    } catch (error) {
      console.error("Error in login:", error);

      const errorMessage =
        error.code === "auth/wrong-password"
          ? "Неверный пароль"
          : error.code === "auth/user-not-found"
          ? "Пользователь не найден"
          : error.message || "Ошибка аутентификации";
      set({ error: errorMessage, loading: false });
      throw errorMessage;
    }
  },

  logout: async () => {
    try {
      await getAuth().signOut();
      set({
        isAuthenticated: false,
        isAdmin: false,
        error: null,
        loading: false,
      });
      localStorage.removeItem("dutiesData");
    } catch (error) {
      console.error("Error during logout:", error);
      set({ error: "Failed to logout", loading: false });
    }
  },
}));

export default useAuthStore;
