import { createContext, useContext } from "react";
import MainDataStore from "./mainDataStore";

interface Store {
    mainDataStore: MainDataStore
}

export const store: Store = {
    mainDataStore: new MainDataStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}