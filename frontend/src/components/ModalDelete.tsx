import { deleteToDo } from "@/actions/toDo"
import { useHandleModalContext } from "@/app/contexts/HandleModalContext"
import { useState } from "react"

type Props = {
    id: number|string|null
}

const ModalDelete = ({id}: Props) => {
    
    const {isOpenDelete, setIsOpenDelete} = useHandleModalContext()
    const deleteTask = async (id: number|string) => {
        await deleteToDo(id)
        setIsOpenDelete(!isOpenDelete)
        window.location.reload()
    }

    if(isOpenDelete) {
        return (
            <div className="bg-gray-400 p-2 bg-opacity-55 w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
                <dialog open 
                    className="
                        m-auto backdrop:opacity-  
                        border border-indigo-400 rounded-lg 
                        px-5 py-3 flex flex-col gap-2 justify-center
                        relative shadow-lg
                    "
                >
                        <p className=" text-gray-400 font-bold">
                            Realmente deseja excluir a tarefa:
                        </p>
                        <div className="flex justify-center gap-4">
                            <button 
                                className="bg-green-400 w-3/12 rounded-lg duration-300 hover:text-white hover:scale-110" 
                                onClick={()=>{id?deleteTask(id):null}}
                            >
                                Sim
                            </button>
                            <button className="bg-red-400 w-3/12 rounded-lg duration-300 hover:text-white hover:scale-110" onClick={()=>setIsOpenDelete(!isOpenDelete) }>Não</button>
                        </div>
                </dialog>
            </div>
        )
    }
}

export default ModalDelete