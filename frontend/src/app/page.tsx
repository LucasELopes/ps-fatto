"use client"

import { useEffect, useState } from "react";
import ListToDos from "./toDos/_components/ListToDo";
import Charts from "@/components/ChartPie";
import { getDeadLines } from "@/actions/toDo";
import { deadLineType } from "@/types/deadLine";


export default function Home() {

  return (

    <div className="grid gap-2  h-full">
      <div className="p-4 ">
        <ListToDos/>
      </div>
    </div>

  )
}
