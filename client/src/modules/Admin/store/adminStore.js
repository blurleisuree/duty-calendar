// import { create } from "zustand";
// import { functions } from "../../../../firebase";
// import { httpsCallable } from "firebase/functions";

// const useAdminStore = create((set) => ({
//   AdminIsAuthenticated: (() => {
//     const isAuth = localStorage.getItem("AdminIsAuthenticated") === "true";
//     const AdminAuthTimestamp = parseInt(
//       localStorage.getItem("AdminAuthTimestamp") || "0"
//     );
//     const hoursSinceAuth = (Date.now() - AdminAuthTimestamp) / (1000 * 60 * 60);
//     return isAuth && hoursSinceAuth < 24; // Авторизация действует 24 часа
//   })(),
//   loading: false,
//   error: null,

//   checkPassword: async (password) => {
//     set({ loading: true, error: null });
//     try {
//       if (!password || typeof password !== "string") {
//         throw new Error("Password must be a non-empty string");
//       }
//       const passwordStr = password.trim();
//       if (!passwordStr) {
//         throw new Error("Password cannot be empty");
//       }

//       const checkPasswordFunction = httpsCallable(
//         functions,
//         "checkAdminPassword"
//       );
//       const result = await checkPasswordFunction({ password: passwordStr });
//       // 24 часа действительна сессия
//       if (result.data.success) {
//         set({ AdminIsAuthenticated: true, loading: false });
//         localStorage.setItem("AdminIsAuthenticated", "true");
//         localStorage.setItem("AdminAuthTimestamp", Date.now().toString());
//       } else {
//         throw new Error("Admin authentication failed");
//       }
//     } catch (error) {
//       console.error("Error in checkPassword:", error);
//       const errorMessage = error.message || "Ошибка аутентификации";
//       set({ error: errorMessage, loading: false });
//       throw errorMessage;
//     }
//   },

//   logout: () => {
//     set({ AdminIsAuthenticated: false, error: null });
//     localStorage.removeItem("AdminIsAuthenticated", "AdminAuthTimestamp");
//   },
// }));

// export default useAdminStore;
