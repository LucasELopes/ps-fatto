"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Charts from "./ChartPie";
import { toDoType } from "@/types/toDo";
import { searchToDo, storeToDo, updateToDo } from "@/actions/toDo";
import Modal from "./Modal";
import { HandleModalContext } from "@/app/contexts/HandleModalContext";
import { SearchToDoContext } from "@/app/contexts/SearchToDoContext";
import ModalDelete from "./ModalDelete";
import ModalUpdate from "./ModalUpdate";
import {ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTimeout } from "timers/promises";

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

    const optionsToast: ToastOptions = {
        position: 'bottom-right',
    }

    const handleSubmitToDo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        try {
            await storeToDo(formData).then((data) => console.log(data))
            setIsOpen(false)
            window.location.reload()
        } catch (error) {
            toast.error('Não foi possível criar a tarefa!', optionsToast)
            setIsOpen(false)
        }
    }

    const handleSubmitUpdateToDo = async(e: React.FormEvent<HTMLFormElement>, id: number|string) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        try {
            
            if(formData.get('name') === toDoInformation?.name) {
                formData.delete('name')
            }
            await updateToDo(formData, id)
            window.location.reload()
        } catch (error) {
            toast.error('Não foi possível editar a tarefa!', optionsToast)
        }
        finally {
            setIsOpen(false)
        }
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
                            <div className="w-full md:ml-[5%]">
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
                                    <ToastContainer autoClose={3500}/>
                                </div>
                        </div>      
                </div>
            </SearchToDoContext.Provider>
        </HandleModalContext.Provider>
    )
}

export default Skeleton;
