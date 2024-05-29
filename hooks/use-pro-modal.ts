import { create } from "zustand";
//  create interface for proModal Display
interface userProModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

// if the button is clicked, isOpen will become true and the modal will be displayed
export const useProModal = create<userProModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))