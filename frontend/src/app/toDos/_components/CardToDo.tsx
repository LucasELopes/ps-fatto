import { HandleModalContext, useHandleModalContext } from "@/app/contexts/HandleModalContext";
import { toDoType } from "@/types/toDo";
import Image from "next/image";
import { useContext } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { todo } from "node:test";

type props = {
    toDo: toDoType
    index: number
}

const CardToDo = ({toDo, index}: props) => {

    const currentDate = new Date()
    const dueDate = new Date(toDo.due_date)
    const diffInMs = dueDate.getTime() - currentDate.getTime()

    const weekInMs = 604800000
    const day = weekInMs/7

    const {isOpen, setIsOpen, setTitleModal, setToDoInformation, setReadOnly, setIsOpenDelete, setKeyToDoDelete} = useHandleModalContext()

    const cost = toDo.cost.split('.')

    return (
        <Draggable draggableId={toDo.id} index={index}>
            {(provided) => (
                <div 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                key={toDo.id} 
                className="w-full h-full grid md:grid-cols-12 gap-3 p-2 cursor-default my-4"
            >
                <div className="col-span-3">
                </div>
                <div className="flex items-center justify-end">
                </div>
                <div className={`
                    ${Number(toDo.cost) < 1000 ? 'bg-indigo-100' : 'bg-indigo-200'} 
                    col-span-5 max-w-[1280px] m-auto md:rounded-xl p-2 grid grid-cols-12 outline-2 hover:outline-indigo-400 hover:outline
                    shadow-lg hover:scale-110 transition-all duration-300 py-4 relative w-full
                    `}>
                    <div className={`
                        ${Number(toDo.cost) < 1000 ? 'bg-indigo-100' : 'bg-indigo-200'} 
                        rounded-t-xl text-xs p-1 w-full text-center
                        text-gray-500 overflow-hidden text-ellipsis 
                        font-bold text-nowrap absolute top-[-17px] left-0 
                        col-span-12 md:w-auto md:text-sm
                    `}>
                        {toDo.id}
                    </div>
                    <div className="col-span-12 md:col-span-3 overflow-hidden">
                    <div className="text-sm text-gray-500 text-ellipsis font-bold my-2 md:my-0">
                            Título
                        </div>
                        <div className="text-ellipsis overflow-hidden text-nowrap text-center pr-3 font-medium">
                            {toDo.name}
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-3 my-1 md:my-0">
                        <div className="text-sm text-gray-500 text-ellipsis font-bold">
                            Custo
                        </div>
                        <div className="overflow-hidden text-nowrap text-center font-medium">
                            R$ {cost[0]}{cost[1] ? '.'+cost[1] : '.00'  }
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-3 my-1 md:my-0">
                        <div className="text-sm text-gray-500 text-ellipsis font-bold">
                            Entrega
                        </div>
                        <div className={`overflow-hidden text-nowrap text-center font-semibold ${diffInMs > weekInMs  ? 'text-black' : (diffInMs < weekInMs && diffInMs > -86400000 )  ? 'text-orange-400' : 'text-red-600 font-bold'}`}>
                            {new Intl.DateTimeFormat('pt-BR').format(new Date(toDo.due_date).getTime() + day)}
                        </div>
                    </div>
                    <div className="col-span-12  md:col-span-3 flex items-center justify-end md:justify-center gap-x-3">
                        <div>
                            <Image
                                className="cursor-pointer hover:scale-[1.2] duration-200 z-50"
                                src={'/eye.png'}
                                alt="view"
                                width={20}
                                height={10}
                                onClick={() => {setIsOpen(!isOpen); setTitleModal('Visualizar Tarefa'); setToDoInformation(toDo); setReadOnly(true)}}
                            />
                        </div>
                        <div>
                            <Image
                                className="cursor-pointer hover:scale-[1.2] duration-200 z-50"
                                src={'/editing.png'}
                                alt="editing"
                                width={20}
                                height={10}
                                onClick={() => {setIsOpen(!isOpen); setTitleModal('Editar Tarefa'); setToDoInformation(toDo); setReadOnly(false)}}
                            />
                        </div>
                        <div>
                            <Image
                                className="cursor-pointer hover:scale-[1.2] duration-200 z-50"
                                src={'/delete.png'}
                                alt="delete"
                                width={20}
                                height={10}
                                onClick={() => {setIsOpenDelete(true); setKeyToDoDelete(toDo.id)}}
                            />
                        </div>
                    </div>            
                </div>
            </div>
            )}
        </Draggable>
    )
}

export default CardToDo;