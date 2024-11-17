'use client'

import { getCostsMonthToDos, getCostsToDos, getDeadLines } from "@/actions/toDo";
import ChartLine from "@/components/ChartLine";
// import ChartLine from "@/components/ChartLine";
import ChartPie from "@/components/ChartPie";
import { costsToDosType } from "@/types/costsTodos";
import { costsToDosMonthType } from "@/types/costsTodosMonth";
import { deadLineType } from "@/types/deadLine";
import { useEffect, useState } from "react";

const Home = () => {

    const [deadline, setDeadline] = useState<deadLineType>()
    const [costsToDo, setCostsToDos] = useState<costsToDosType>()
    const [costsMonthToDos, setCostsMonthToDos] = useState<costsToDosMonthType|null>(null)

    useEffect(
        () => {
        
        getDeadLines()
        .then((res) => setDeadline(res))
        
        
        getCostsToDos()
        .then((res) => setCostsToDos(res)) 

        getCostsMonthToDos()
        .then((data) => setCostsMonthToDos(data))

    },[])

    return (
        <div className="flex justify-center flex-wrap items-center h-screen">
            <div>
                <div>
                    <ChartPie deadlines={deadline} labels ={[ 'Tarefas no prazo', 'Tarefas perto do prazo', 'Tarefas atrasadas']} color={[ '#54d754', '#e5e552', '#d75a54']}/>
                </div>
                <div>
                    <ChartPie costTodos={costsToDo}  labels ={[ 'Abaixo de R$ 600', 'Menor ou igual a R$1000', 'Acima de R$1000']} color={[ '#7adcde', '#4a79d7', '#3207de']}/>
                </div>
            </div>
            <div>
                <ChartLine costsTodos={costsMonthToDos}/>
            </div>
        </div>
    )
}

export default Home;