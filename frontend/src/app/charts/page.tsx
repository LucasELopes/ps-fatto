'use client'

import { getCostsToDos, getDeadLines } from "@/actions/toDo";
import ChartLine from "@/components/ChartLine";
import ChartPie from "@/components/ChartPie";
import { costsToDosType } from "@/types/costsTodos";
import { deadLineType } from "@/types/deadLine";
import { useEffect, useState } from "react";

const Home = () => {

    const [deadline, setDeadline] = useState<deadLineType>()
    const [costsToDos, setCostsToDos] = useState<costsToDosType|null>(null)

    useEffect(() => {
        getDeadLines()
        .then((res) => {setDeadline(res)})

        getCostsToDos()
        .then((res) => {setCostsToDos(res)}) 
    },[])

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 shadow-lg w-3/12 min-w-[450px] max-w-[520px] m-2 rounded-md">
                <ChartPie deadlines={deadline}/>
            </div>
            <div className="bg-gray-100 shadow-lg w-4/12 min-w-[500px] max-w-[620px] m-2 rounded-md">
                <ChartLine costsTodos={costsToDos}/>
            </div>
        </div>
    )
}

export default Home;