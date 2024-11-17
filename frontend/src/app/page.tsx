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
    setLoading(true)

    if(!keyTodo) {
      allToDo().then((data) => setToDos(data)).finally(() => setLoading(false))
    }
    else if(keyTodo) {
      searchToDo(keyTodo).then((data) => {data && setToDos(data)}).finally(() => setLoading(false))
    }
  },[keyTodo]) 

  if(loading) {
    return (
      <Loading/>
    )
  }
  else if(toDos && toDos?.length > 0) {
      return (
        <div className="grid gap-2  h-full">
          <div className="p-4 ">
            <ListToDos toDosProps={toDos}/>
          </div>
        </div>
      )
  }
  else if(keyTodo) {
      return (
        <div className='flex justify-center items-center w-screen h-[calc(100vh-4rem)] text-center'>
          <div className='font-medium cursor-pointer' onClick={() => {setKeyToDo('')}}>
            A tarefa "{keyTodo}" não foi encontrada!   
          </div>
        </div>
      )
  }
  else {
    return (
      <div className='flex justify-center items-center w-screen h-[calc(100vh-4rem)] text-center'>
        <div className='font-medium'>
          Não há tarefas para serem exibidas!  
        </div>
      </div>
    )
  }

}
