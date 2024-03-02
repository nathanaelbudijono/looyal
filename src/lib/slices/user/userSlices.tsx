import { StateCreator } from "zustand";
import axios from "axios";
import { verifyAPI } from "@/constant/env";

export interface UserProps {
  success: boolean;
  message: string;
  data: {
    username: string;
    name: string;
    address: string;
  };
}

export interface userState {
  verifiedUser: UserProps | null;
  verifyUser: (token: string) => void;
  errorMessage: string;
}

export const VerifyUserSlice: StateCreator<userState> = (set, get) => ({
  verifiedUser: null,
  errorMessage: "",
  verifyUser: async (token: string) => {
    try {
      const res = await axios.get(verifyAPI as string, {
        headers: { "X-Auth-Token": token },
      });

      set({ verifiedUser: res.data, errorMessage: "" });
    } catch (err: any) {
      set({ errorMessage: err.message });
    }
  },
});
