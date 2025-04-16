import { create } from "zustand";

const useDutyStore = create((set) => ({
  duties: [],
  isLoading: false,
  error: null,

  fetchDuties: async () => {
    set({ isLoading: true, error: null });
    try {
      const responce = await fetch(
        "http://127.0.0.1:5001/dutydays-8be4d/europe-north1/getDuties"
      );
      const data = await responce.json();
      set({ duties: data.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  getDutiesByOrganization: (organization) => {
    return organization
      ? useDutyStore
          .getState()
          .duties.filter((duty) => duty.organization === organization)
      : null;
  },

  getDutiesByDate: (date) => {
    return date
      ? useDutyStore
          .getState()
          .duties.filter((duty) => duty.organization === date)
      : null;
  },

  getOrgs: () => {},

  addNewDuties: async (event) => {
    set({ isLoading: true, error: null });
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
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useDutyStore;
