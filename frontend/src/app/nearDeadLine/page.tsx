"use client"

import { useEffect, useState } from "react";
import { getNearDeadLine} from "@/actions/toDo";
import ListToDos from "../toDos/_components/ListToDo";
import { toDoType } from "@/types/toDo";
import Loading from "@/components/Loading";

export default function Home() {

    const [toDos, setToDos] = useState<toDoType[]>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getNearDeadLine().then((data) => setToDos(data)).finally(() => setLoading(false))
    }, [])
    
    if(loading) {
        <Loading/>
    }

    if(toDos?.length) {
        return (
            <div className="grid gap-2 bg-indigo-50 h-full">
                <div className="p-4 ">
                <ListToDos toDosProps={toDos}/>                
                </div>
          </div>
        )
    }

}