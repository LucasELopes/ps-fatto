import { allToDo, searchToDo } from "@/actions/toDo";
import { toDoType } from "@/types/toDo";
import { useEffect, useState } from "react";
import CardToDo from "./CardToDo";
import { useSearchToDoContext } from "@/app/contexts/SearchToDoContext";
import Link from "next/link";
import Loading from "@/components/Loading";
import {DragDropContext, Droppable} from '@hello-pangea/dnd'

type Props = {
    toDosProps?: toDoType[]|null
}

const ListToDos = ({toDosProps}: Props) => {

    const { keyTodo, setKeyToDo } = useSearchToDoContext();
    
    const [toDos, setToDos] = useState<toDoType[]>([]);
    const [toDosShow, setToDosShow] = useState<toDoType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    function reorder<T>(list:T[], startIndex: number, endIndex: number) {
        const result = Array.from(list)
        const [remove] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, remove)

        return result;
    }    

    const onDragEnd = (result: any) => {
        if(!result.destination) {
            return 
        }

        const items = reorder(toDos, result.source.index, result.destination.index)
        setToDos(items)
    }
    
    const handleAllToDo = async() => {
       await (allToDo().then(async (data) => setToDos(data)));
    } 

    if(!toDosProps) {
        useEffect(() => {
                if (!keyTodo) {
                    handleAllToDo().finally(() => setLoading(false))
                } else {
                    searchToDo(keyTodo).then((data) => setToDosShow(data))
                    .finally(() => setLoading(false));
                }
            }, [keyTodo]);
    }else if(toDosProps) {

        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="tasks" type="list" direction="vertical">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {toDosProps.length > 0 && toDosProps.map((toDo, index) => ( 
                                <CardToDo key={toDo.id} toDo={toDo} index={index}/>
                            ))}
                        {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>       
        );

    }

    if(loading) {
        return (
            <Loading/>
        );
    }

    if(keyTodo) {
        if (toDosShow) { // Exibe a tarefa pesquisa
            return (
                toDosShow.map((toDo) => (
                    <div key={toDo.id} className="
                        w-[calc(100vw-3.5rem)] md:w-[calc(100vw-6%)] h-[calc(100vh-6rem)] 
                        flex justify-center items-center 
                    ">
                        <CardToDo key={toDo.id} toDo={toDo} index={0}/>
                    </div>
                ))
            );
        }
        else { // Exibe caso a tarefa pesquisa não for encontrada
            return (
                <div className="
                    w-[calc(100vw-3.5rem)] md:w-[calc(100vw-6%)] h-[calc(100vh-12rem)] overflow-hidden flex justify-center items-center 
                "
                >
                    <Link href={'/'} onClick={() => setKeyToDo(null)} className="animate-pulseSize">
                        A Tarefa "{keyTodo}" não encontrada!
                    </Link>
                </div>
            );
        }
    }
    else if(!keyTodo) {
        if (toDos.length > 0) { // Exibe todas as tarefas

            return (
                <div className="mb-14">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="tasks" type="list" direction="vertical">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {toDos.length > 0 && toDos.map((toDo, index) => ( 
                                    <CardToDo key={toDo.id} toDo={toDo} index={index}/>
                                ))}
                            {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>       
                </div>
            );
        }
        else if(toDos.length === 0 && !toDosShow && !toDosProps && !loading){
            return (
                <div className="
                overflow-y-hidden w-[calc(100vw-3.5rem)] md:w-[calc(100vw-6%)] h-[calc(100vh-6rem)] 
                flex justify-center items-center 
                "
                >
                    <Link href={'/'} onClick={() => setKeyToDo(null)} className="animate-pulseSize font-semibold">
                        Não há tarefas para serem exibidas!
                    </Link>
                </div>
            );
        }

    }


}

export default ListToDos;
