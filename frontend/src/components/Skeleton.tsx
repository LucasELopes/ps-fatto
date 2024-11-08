"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Charts from "./ChartPie";
import { toDoType } from "@/types/toDo";
import ListToDos from "@/app/toDos/_components/ListToDo";
import { searchToDo, storeToDo, updateToDo } from "@/actions/toDo";
import Modal from "./Modal";
import { HandleModalContext } from "@/app/contexts/HandleModalContext";
import { SearchToDoContext } from "@/app/contexts/SearchToDoContext";
import ModalDelete from "./ModalDelete";
import ModalUpdate from "./ModalUpdate";

type Props = {
    children?: ReactNode;
}

const Skeleton = ({children}: Props) => {
    
    const [titleModal, setTitleModal] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)


    const [keyToDoDelete, setKeyToDoDelete] = useState<string|number|null>(null)
    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)

    const [readOnly, setReadOnly] = useState<boolean>(false)

    const [keyTodo, setKeyToDo] = useState<string|number|null>(null)
    const [toDoInformation, setToDoInformation] = useState<toDoType|null>(null)

    const handleSubmitToDo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        try {
            await storeToDo(formData)
            setIsOpen(false)
        } catch (error) {
            console.log('Erro ao enviar tarefa: ', error)
        }
        window.location.reload()
    }

    const handleSubmitUpdateToDo = async(e: React.FormEvent<HTMLFormElement>, id: number|string) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        try {
            updateToDo(formData, id).then((data) => console.log(data))
            setIsOpen(false)
        } catch (error) {
            console.log('Erro ao atualizar a tarafa: ', error)
        }
        // window.location.reload()
    }

    return (
        <HandleModalContext.Provider value={{isOpen, setIsOpen, titleModal, 
                                                setTitleModal, setToDoInformation, readOnly, 
                                                setReadOnly, isOpenDelete, setIsOpenDelete, 
                                                keyToDoDelete, setKeyToDoDelete
                                            }}
        >
            <SearchToDoContext.Provider value={{keyTodo, setKeyToDo}}>
                <div className="flex">        
                        <div className="">
                            <SideBar iconSite="/logoSite.png"></SideBar>
                        </div>
                            <div className="w-full ml-14 md:ml-[5%]">
                                <Header/>
                            <div>
                                {isOpen && toDoInformation &&
                                    <ModalUpdate 
                                        modalTitle={titleModal} 
                                        handleSubmit={handleSubmitUpdateToDo} 
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
                                {isOpenDelete &&
                                    <ModalDelete id={keyToDoDelete}/>
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
