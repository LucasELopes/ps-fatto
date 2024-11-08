'use client'

import { getCostsToDos, getDeadLines } from "@/actions/toDo";
// import ChartLine from "@/components/ChartLine";
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
            <div>
                <ChartPie deadlines={deadline}/>
            </div>
            <div>
                <ChartPie deadlines={costsToDos}/>
            </div>
        </div>
    )
}

export default Home;