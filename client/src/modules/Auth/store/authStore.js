import { create } from "zustand";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";

const useAuthStore = create((set) => ({
  isAuthenticated: (() => {
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    const authTimestamp = parseInt(localStorage.getItem("authTimestamp") || "0");
    const hoursSinceAuth = (Date.now() - authTimestamp) / (1000 * 60 * 60);
    return isAuth && hoursSinceAuth < 24;
  })(),
  isAdmin: localStorage.getItem("isAdmin") === "true", // Инициализация из localStorage
  loading: false,
  error: null,

  login: async (password, role = "default") => {
    set({ loading: true, error: null });
    try {
      if (!password) {
        throw new Error("password is required");
      }
      let email;
      if (role === "admin") {
        email = "ipishir@gmail.com";
      } else {
        email = "ipishir@rambler.ru";
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const tokenResult = await user.getIdTokenResult();
      const isAdmin = tokenResult.claims.role === "admin";
      set({ isAuthenticated: true, isAdmin });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("authTimestamp", Date.now().toString());
      localStorage.setItem("isAdmin", isAdmin.toString()); // Сохраняем isAdmin
      set({ loading: false });
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

  logout: () => {
    set({ isAuthenticated: false, isAdmin: false, error: null });
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authTimestamp");
    localStorage.removeItem("authWayIsAdmin"); 
    localStorage.removeItem("dutiesData"); 
    localStorage.removeItem("isAdmin"); 
    getAuth().signOut();
  },
}));

export default useAuthStore;