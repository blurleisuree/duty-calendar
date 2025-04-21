import { create } from "zustand";

const useMessageStore = create((set) => ({
  messages: [],

  addMessage: (text) => {
    set((state) => ({
      messages: [...state.messages, { id: Date.now(), text }],
    }));
  },

  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    })),
}));

export default useMessageStore;
