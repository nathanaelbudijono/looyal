import { create } from "zustand";
import { ChatSlice, ChatState } from "./slices/chat/chatSlices";

type storeState = ChatState;

export const chatAppStore = create<storeState>()((...a) => ({
  ...ChatSlice(...a),
}));
