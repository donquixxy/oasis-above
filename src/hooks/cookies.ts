import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { getCookie, setCookie } from "typescript-cookie";

interface CookieState {
  getSessionID: string;
  setSessionID: () => string;
}

export const useCookie = create<CookieState>((set, get) => ({
  getSessionID: getCookie("session_id") || "",
  setSessionID: () => {
    const existingSession = get().getSessionID;

    if (existingSession) {
      return existingSession;
    }

    const newSessionID = uuidv4();

    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours

    setCookie("session_id", newSessionID, { expires: expireDate });

    set({ getSessionID: newSessionID });

    return newSessionID;
  },
}));
