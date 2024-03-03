import { create } from "zustand";
import { BreakoutSlice, BreakoutState } from "./slices/room/breakoutSlices";

type storeState = BreakoutState;

export const breakoutAppStore = create<storeState>()((...a) => ({
  ...BreakoutSlice(...a),
}));
