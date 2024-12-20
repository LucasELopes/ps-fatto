import { toDoType } from "@/types/toDo";
import { createContext, useContext } from "react";

type ModalContextType = {
    // showToDo: toDoType | null
    // setShowToDo: (toDo: toDoType) => void

    // toDoInformation: toDoType
    readOnly: boolean
    setReadOnly: (value: boolean) => void

    setToDoInformation: (value: toDoType|null) => void

    titleModal: string
    setTitleModal: (value: string) => void

    keyToDoDelete: string|number|null
    setKeyToDoDelete: (value: string|number|null) => void

    isOpenDelete: boolean
    setIsOpenDelete: (isOpenDelete: boolean) => void

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

