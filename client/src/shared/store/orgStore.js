import { create } from "zustand";

const useOrgStore = create((set) => ({
  activeOrg: "Все организации",
  orgs: [],
  isLoading: false,
  error: null,

  setActiveOrg: (orgName) => {
    set({ activeOrg: orgName });
  },

  getAllOrgs: (duties) => {
    const all = duties.map((duty) => {
      return duty.organization;
    });
    all.push('Все организации')
    set({orgs: [...new Set(all)]})
  },
}));

export default useOrgStore;
