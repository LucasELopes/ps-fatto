import { HandleModalContext, useHandleModalContext } from "@/app/contexts/HandleModalContext";
import { toDoType } from "@/types/toDo";
import Image from "next/image";
import { useContext } from "react";

type props = {
    toDo: toDoType
}

const CardToDo = ({toDo}: props) => {

    const currentDate = new Date()
    const dueDate = new Date(toDo.due_date)

    const diffInMs = dueDate.getTime() - currentDate.getTime()
    const weekInMs = 604800000

    const {isOpen, setIsOpen, setTitleModal, setToDoInformation, setReadOnly} = useHandleModalContext()

    return (

        <div 
            key={toDo.id} 
            className="w-full h-full grid grid-cols-12 gap-2 p-2 cursor-pointer"
            
        >
            <div className="col-span-2">
            </div>
            <div className="flex items-center justify-end">
            </div>
            <div className={`
                ${toDo.cost < 1000 ? 'bg-indigo-100' : 'bg-indigo-200'} 
                col-span-7 max-w-[1280px] m-auto rounded-xl p-2 grid grid-cols-12 outline-2 hover:outline-indigo-400 hover:outline
                shadow-md  hover:scale-105 transition-all duration-300 py-4 
            `}>
                <div className="col-span-2 overflow-hidden">
                    <div className="w-9/12 text-sm text-gray-500 overflow-hidden text-ellipsis font-bold text-nowrap">
                        {toDo.id}
                    </div>
                    <div className="text-ellipsis overflow-hidden text-nowrap text-center pr-3 font-medium">
                        {toDo.name}
                    </div>
                </div>
                <div className="col-span-5">
                    <div className="text-sm text-gray-500 text-ellipsis font-bold">
                        Descrição
                    </div>
                    <div className="overflow-hidden text-nowrap text-ellipsis text-center font-medium">
                        {toDo.description}
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="text-sm text-gray-500 text-ellipsis font-bold">
                        Custo
                    </div>
                    <div className="overflow-hidden text-nowrap text-center font-medium">
                        R$ {toDo.cost}
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="text-sm text-gray-500 text-ellipsis font-bold">
                        Entrega
                    </div>
                    <div className={`overflow-hidden text-nowrap text-center font-semibold ${diffInMs > weekInMs  ? 'text-black' : (diffInMs < weekInMs && diffInMs > -86400000 )  ? 'text-orange-400' : 'text-red-600 font-bold'}`}>
                        {toDo.due_date.toLocaleString()}
                    </div>
                </div>
                <div className="col-span-1 flex items-center justify-center gap-x-3 z-50">
                    <div>
                        <Image
                            className="cursor-pointer hover:scale-150 duration-200 z-50"
                            src={'/eye.png'}
                            alt="add"
                            width={20}
                            height={10}
                            onClick={() => {setIsOpen(!isOpen); setTitleModal('Visualizar Tarefa'); setToDoInformation(toDo); setReadOnly(true)}}
                        />
                    </div>
                    <div>
                        <Image
                            className="cursor-pointer hover:scale-150 duration-200 z-50"
                            src={'/editing.png'}
                            alt="editing"
                            width={20}
                            height={10}
                            onClick={() => {setIsOpen(!isOpen); setTitleModal('Editar Tarefa'); setToDoInformation(toDo); setReadOnly(false)}}
                        />
                    </div>
                    <div>
                        <Image
                            className="cursor-pointer hover:scale-150 duration-200 z-50"
                            src={'/delete.png'}
                            alt="delete"
                            width={20}
                            height={10}
                        />
                    </div>
                </div>            
            </div>
        </div>
    )
}

export default CardToDo;