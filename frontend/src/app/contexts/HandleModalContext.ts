import { toDoType } from "@/types/toDo";
import { createContext, useContext } from "react";

type ModalContextType = {
    // showToDo: toDoType | null
    // setShowToDo: (toDo: toDoType) => void

    titleModal: string
    setTitleModal: (value: string) => void

    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export const HandleModalContext = createContext<ModalContextType | null>(null)

export const useHandleModalContext = () => {
    const context = useContext(HandleModalContext);
    if (!context) {
        throw new Error("HandleModalContext deve ser usado dentro de um HandleModalContext.Provider");
    }
    return context;
};

