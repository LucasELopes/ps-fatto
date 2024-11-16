"use client"

import 'react-toastify'
import { useEffect, useState } from "react";
import ListToDos from "./toDos/_components/ListToDo";
import Charts from "@/components/ChartPie";
import { allToDo, getDeadLines, searchToDo } from "@/actions/toDo";
import { deadLineType } from "@/types/deadLine";
import { ToastContainer, toast } from 'react-toastify';
import { toDoType } from '@/types/toDo';
import { date } from 'zod';
import Loading from '@/components/Loading';
import { useSearchToDoContext } from './contexts/SearchToDoContext';


export default function Home() {

  const [toDos, setToDos] = useState<toDoType[]|undefined>()
  const [loading, setLoading] = useState(true)

  const {keyTodo, setKeyToDo} = useSearchToDoContext()

  useEffect(() => {
    if(!keyTodo) {
      allToDo().then((data) => setToDos(data)).finally(() => setLoading(false))
    }
    else {
      searchToDo(keyTodo).then((data) => {data && setToDos(data)}).finally(() => setLoading(false))
    }
  },[keyTodo]) 

  if(loading) {
    <Loading/>
  }
  else if(toDos) {
      return (
        <div className="grid gap-2  h-full">
          <div className="p-4 ">
            <ListToDos toDosProps={toDos}/>
          </div>
        </div>
    
      )
  }
}
