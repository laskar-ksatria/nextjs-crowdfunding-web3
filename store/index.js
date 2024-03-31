import { useLayoutEffect } from "react";
import { create } from "zustand";
import createContext from "zustand/context";

// States ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
export const initialState = {
  message: "Hello",
};

export const stateReducer = (set, get) => ({
  setMessage: (payload) => set({ message: payload }),
});
// States ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

let store;

const getDefaultInitialState = () => ({ ...initialState });

const zustandContext = createContext();

export const ZustandProvider = zustandContext.Provider;
/** @type {import('zustand/index').UseStore<typeof initialState>} */
export const { useStore } = zustandContext;

export const initializeStore = (preloadedState = {}) =>
  create((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    ...stateReducer(set, get),
  }));

export function useCreateStore(serverInitialState) {
  if (typeof window === "undefined") {
    return () => initializeStore(serverInitialState);
  }

  const isReusingStore = Boolean(store);
  store = store ?? initializeStore(serverInitialState);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (serverInitialState && isReusingStore) {
      store.setState(
        {
          ...store.getState(),
          ...serverInitialState,
        },
        true
      );
    }
  });

  return () => store;
}
