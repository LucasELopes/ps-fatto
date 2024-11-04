"use client"

import { useEffect, useState } from "react";
import Charts from "@/components/ChartPie";
import { getDeadLines, getOnTime } from "@/actions/toDo";
import { deadLineType } from "@/types/deadLine";
import ListToDos from "../toDos/_components/ListToDo";
import { toDoType } from "@/types/toDo";
import Link from "next/link";


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