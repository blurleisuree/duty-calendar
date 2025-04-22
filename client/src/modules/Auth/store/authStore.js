import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    loading: true,
    error: null,
}))