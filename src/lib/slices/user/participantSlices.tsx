import { StateCreator } from "zustand";
import axios from "axios";
import { participantAPI } from "@/constant/env";

interface Participant {
  id: string;
  name: string;
  username: string;
}

export interface ParticipantProps {
  success: boolean;
  message: string;
  data: Participant[];
}

export interface ParticipantState {
  participant: ParticipantProps | null;
  getParticipant: (token: string) => void;
  errorMessage: string;
}

export const ParticipantSlice: StateCreator<ParticipantState> = (set, get) => ({
  participant: null,
  errorMessage: "",
  getParticipant: async (token: string) => {
    try {
      const res = await axios.get(participantAPI as string, {
        headers: { "X-Auth-Token": token },
      });

      set({ participant: res.data, errorMessage: "" });
    } catch (err: any) {
      set({ errorMessage: err.message });
    }
  },
});
