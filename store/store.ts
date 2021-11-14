import { createContext, useContext } from "react";
import SomeStore from "./someStore";

interface Store {
    someStore: SomeStore
}

export const store: Store = {
    someStore: new SomeStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}