import { create } from "zustand";
import { VerifyUserSlice, userState } from "./slices/user/userSlices";
import {
  ParticipantSlice,
  ParticipantState,
} from "./slices/user/participantSlices";

type storeState = userState & ParticipantState;

export const userAppStore = create<storeState>()((...a) => ({
  ...VerifyUserSlice(...a),
  ...ParticipantSlice(...a),
}));
