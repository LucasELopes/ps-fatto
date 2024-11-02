import { allToDo } from "@/actions/toDo";
import { toDoType } from "@/types/toDo"
import Image from "next/image";
import { useEffect, useState } from "react";

const ListToDos = () => {
    
    const [toDos, setToDos] = useState<toDoType[]>([])
    const currentDate = new Date()

    useEffect(() => {allToDo()
        .then((data) => setToDos(data))
    },[])

    return (
        <div>
            {toDos && toDos.map((toDo, index) => (
                <div key={toDo.id} className="w-full h-full grid grid-cols-11 gap-2 p-2">
                    <div className="col-span-1"></div>
                    <div className={`
                        ${toDo.cost < 1000 ? 'bg-indigo-100' : 'bg-indigo-300'} 
                        col-span-9 rounded-xl hover:scale-105 
                        outline-2 hover:outline-indigo-400 hover:outline 
                        transition-all duration-200 p-2 grid grid-cols-12
                        shadow-md 
                    `}>
                        <div className="col-span-3 overflow-hidden">
                            <div className="w-4/12 text-sm text-gray-400 overflow-hidden text-ellipsis font-bold">
                                #{index}
                            </div>
                            <div className="text-ellipsis overflow-hidden text-nowrap text-center">
                                {toDo.name}
                            </div>
                        </div>
                        <div className="col-span-5">
                            <div className="text-sm text-gray-400 text-ellipsis font-bold">
                                Descrição
                            </div>
                            <div className="overflow-hidden text-nowrap text-ellipsis text-center">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="text-sm text-gray-400 text-ellipsis font-bold">
                                Custo
                            </div>
                            <div className="overflow-hidden text-nowrap text-center">
                                R$ {toDo.cost}
                            </div>
                        </div>
                        <div className="col-span-2 flex items-center justify-center gap-x-3">
                            <div>
                                <Image
                                    className="cursor-pointer"
                                    src={'/editing.png'}
                                    alt="add"
                                    width={25}
                                    height={10}
                                />
                            </div>
                            <div>
                                <Image
                                    className="cursor-pointer"
                                    src={'/delete.png'}
                                    alt="add"
                                    width={25}
                                    height={10}
                                />
                            </div>
                        </div>            
                    </div>
                </div>
            ))}
        </div>
    )

}

export default ListToDos