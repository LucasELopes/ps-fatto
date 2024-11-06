import { allToDo, searchToDo } from "@/actions/toDo";
import { toDoType } from "@/types/toDo";
import Image from "next/image";
import { useEffect, useState } from "react";
import CardToDo from "./CardToDo";
import { useSearchToDoContext } from "@/app/contexts/SearchToDoContext";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useHandleModalContext } from "@/app/contexts/HandleModalContext";
import { todo } from "node:test";

type Props = {
    toDosProps?: toDoType[]|null
}

const ListToDos = ({toDosProps}: Props) => {
    const { keyTodo, setKeyToDo } = useSearchToDoContext();
    
    const [toDos, setToDos] = useState<toDoType[]>([]);
    const [toDosShow, setToDosShow] = useState<toDoType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    if(!toDosProps) {
        useEffect(() => {
                if (!keyTodo) {
                    allToDo().then((data) => setToDos(data));
                } else {
                    searchToDo(keyTodo).then((data) => setToDosShow(data));
                }
                setLoading(false)
            }, [keyTodo]);
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
                        <CardToDo key={toDo.id} toDo={toDo} />
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
                <div>
                    {toDos.map((toDo) => ( 
                        <CardToDo key={toDo.id} toDo={toDo} />
                    ))}
                </div>       
            );
        }
        else if(toDos.length === 0 && !toDosShow){
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
