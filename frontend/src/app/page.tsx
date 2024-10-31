"use client"

import { useEffect, useState } from "react";
import ListToDos from "./toDos/list-toDos";
import Charts from "@/components/Charts";
import { getDeadLines } from "@/actions/toDo";
import { deadLineType } from "@/types/deadLine";


export default function Home() {
  
  const [deadline, setDeadLine] = useState<deadLineType>() 

  useEffect(
    () => {
      getDeadLines()
      .then((data) => setDeadLine(data))
    }, [])

  return (
    <div className="flex justify-end items-center h-full">
        <Charts deadlines={deadline}/>
        <ListToDos/>
    </div>
  )
}
