import { StateCreator } from "zustand";
import axios from "axios";
import { breakoutAPI } from "@/constant/env";

interface breakoutParticipant {
  id: string;
  name: string;
  userIds: string[];
}

export interface breakoutProps {
  success: boolean;
  message: string;
  data: breakoutParticipant[];
}

export interface BreakoutState {
  breakout: breakoutProps | null;
  getBreakout: (token: string) => void;
  errorMessage: string;
}

export const BreakoutSlice: StateCreator<BreakoutState> = (set, get) => ({
  breakout: null,
  errorMessage: "",
  getBreakout: async (token: string) => {
    try {
      const res = await axios.get(breakoutAPI as string, {
        headers: { "X-Auth-Token": token },
      });

      set({ breakout: res.data, errorMessage: "" });
    } catch (err: any) {
      set({ errorMessage: err.message });
    }
  },
});
