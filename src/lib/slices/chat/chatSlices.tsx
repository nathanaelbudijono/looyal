import { StateCreator } from "zustand";
import axios from "axios";
import { chatAPI } from "@/constant/env";

interface chatData {
  id: string;
  userId: string;
  chat: string;
}

export interface chatProps {
  success: boolean;
  message: string;
  data: chatData[];
}

export interface ChatState {
  chats: chatProps | null;
  getChatParticipant: (token: string, userId: string) => void;
  errorMessage: string;
}

export const ChatSlice: StateCreator<ChatState> = (set, get) => ({
  errorMessage: "",
  chats: null,
  getChatParticipant: async (token: string, userId: string) => {
    try {
      const data = await axios.get(chatAPI as string, {
        params: {
          userId: userId,
        },
        headers: {
          "X-Auth-Token": token,
        },
      });
      set({ chats: data.data, errorMessage: "" });
    } catch (err: any) {
      set({ errorMessage: err.message });
    }
  },
});
