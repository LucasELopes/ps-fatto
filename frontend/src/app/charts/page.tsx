'use client'

import { getDeadLines } from "@/actions/toDo";
import Charts from "@/components/Charts";
import { deadLineType } from "@/types/deadLine";
import { useEffect, useState } from "react";

const Home = () => {

    const [deadline, setDeadline] = useState<deadLineType>()

    useEffect(() => {
        getDeadLines()
        .then((res) => {setDeadline(res)})
    },[])

    return (
        <div>
            <div className="col-span-4 m-2">
                <Charts deadlines={deadline}/>
            </div>
        </div>
    )
}

export default Home;