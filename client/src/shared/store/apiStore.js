import { create } from "zustand";

const useApiStore = create((set) => ({
  duties: [],

  getDuties: async () => {
    try {
      const responce = await fetch(
        "http://127.0.0.1:5001/dutydays-8be4d/europe-north1/getDuties"
      );
      const data = await responce.json();
      set({ duties: { ...data.data } });
    } catch (error) {
      console.error("Error getting duties", error);
    }
  },

  addNewDuties: async (event) => {
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(
        "http://127.0.0.1:5001/dutydays-8be4d/europe-north1/addNewDuty",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  },
}));

export default useApiStore;
