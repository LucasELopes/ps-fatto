"use client"

import { useEffect, useState } from "react";
import { getOnTime } from "@/actions/toDo";
import ListToDos from "../toDos/_components/ListToDo";
import { toDoType } from "@/types/toDo";

export default function Home() {

    const [toDos, setToDos] = useState<toDoType[]>()

    useEffect(() => {
        getOnTime().then((data) => setToDos(data))
    }, [])

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