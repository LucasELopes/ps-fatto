"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Charts from "./ChartPie";
import { toDoType } from "@/types/toDo";
import ListToDos from "@/app/toDos/_components/ListToDo";
import { searchToDo, storeToDo } from "@/actions/toDo";
import Modal from "./Modal";
import { HandleModalContext } from "@/app/contexts/HandleModalContext";
import { SearchToDoContext } from "@/app/contexts/SearchToDoContext";

type Props = {
    children?: ReactNode;
}

const Skeleton = ({children}: Props) => {
    
    const [titleModal, setTitleModal] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [readOnly, setReadOnly] = useState<boolean>(false)

    const [keyTodo, setKeyToDo] = useState<string|number|null>(null)
    const [toDoInformation, setToDoInformation] = useState<toDoType|null>(null)

    const handleSubmitToDo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        try {
            storeToDo(formData)
            setIsOpen(false)
        } catch (error) {
            console.log('Erro ao enviar tarefa: ', error)
        }
    }

    return (
        <HandleModalContext.Provider value={{isOpen, setIsOpen, titleModal, setTitleModal, setToDoInformation, readOnly, setReadOnly}}>
            <SearchToDoContext.Provider value={{keyTodo, setKeyToDo}}>
                <div className="flex">        
                        <div className="">
                            <SideBar iconSite="/logoSite.png"></SideBar>
                        </div>
                            <div className="w-full ml-14 md:ml-[5%]">
                                <Header/>
                            <div>
                                {isOpen && toDoInformation  &&
                                    <Modal 
                                        modalTitle={titleModal} 
                                        handleSubmit={handleSubmitToDo} 
                                        toDoInformation={toDoInformation} 
                                        readonly={readOnly}
                                    /> 
                                }
                                {isOpen && !toDoInformation && 
                                    <Modal 
                                        modalTitle={titleModal} 
                                        handleSubmit={handleSubmitToDo} 
                                        readonly={readOnly}
                                    /> 
                                }
                                {children}
                            </div>
                        </div>      
                </div>
            </SearchToDoContext.Provider>
        </HandleModalContext.Provider>
    )
}

export default Skeleton;