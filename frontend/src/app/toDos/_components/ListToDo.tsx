import { allToDo, searchToDo } from "@/actions/toDo";
import { toDoType } from "@/types/toDo";
import Image from "next/image";
import { useEffect, useState } from "react";
import CardToDo from "./CardToDo";
import { useSearchToDoContext } from "@/app/contexts/SearchToDoContext";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useHandleModalContext } from "@/app/contexts/HandleModalContext";

const ListToDos = () => {
    const { keyTodo, setKeyToDo } = useSearchToDoContext();
    
    const [toDos, setToDos] = useState<toDoType[]>([]);
    const [toDosShow, setToDosShow] = useState<toDoType | null>(null);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!keyTodo) {
            allToDo().then((data) => setToDos(data));
        } else {
            searchToDo(keyTodo).then((data) => setToDosShow(data));
        }
        setLoading(false)
    }, [keyTodo]);

    if (keyTodo && toDosShow) {
        return (
            <div className="
                overflow-hidden w-[calc(100vw-3.5rem)] md:w-[calc(100vw-6%)] h-[calc(100vh-6rem)] 
                flex justify-center items-center 
            ">
                <CardToDo key={toDosShow.id} toDo={toDosShow} />
            </div>
        );
    }

    if (!keyTodo && toDos.length > 0) {
        return (
            <div className="overflow-y-scroll overflow-x-hidden">
                {toDos.map((toDo, index) => (
                    <CardToDo key={index} toDo={toDo} />
                ))}
            </div>
        );
    }

    if(keyTodo && toDos.length === 0 && !toDosShow && !loading) {
        return (
            <div className="
            overflow-y-hidden w-[calc(100vw-3.5rem)] md:w-[calc(100vw-6%)] h-[calc(100vh-6rem)] 
            flex justify-center items-center 
            "
            >
                <Link href={'/'} onClick={() => setKeyToDo(null)} className="animate-pulseSize">
                    A Tarefa "{keyTodo}" não encontrada!
                </Link>
            </div>
        );
    }

    if(loading) {
        return (
            <Loading/>
        );
    }
    

}

export default ListToDos;
