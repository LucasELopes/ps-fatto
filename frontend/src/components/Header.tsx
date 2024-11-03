'use client'

import { searchToDo } from "@/actions/toDo";
import { useSearchToDoContext } from "@/app/contexts/SearchToDoContext";
import ListToDos from "@/app/toDos/_components/ListToDo";
import { toDoType } from "@/types/toDo";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const Header = () => {
    
    const [valueInput, setValueInput] = useState<string|number>('')
    const {keyTodo, setKeyToDo} = useSearchToDoContext()

    return (
        <div 
            className="
                h-16 bg-secondColor
                flex flex-col justify-center m-auto
                md:grid md:grid-cols-12
                items-center px-8 text-white
                font-bold text-2xl 
            "
        >
            <div className="md:col-span-1">
            </div>
            <div className="md:col-span-1 text-base md:text-lg lg:text-xl">
                PRONTO!
            </div>
            <div className="md:col-span-4"></div>
            <div className="md:col-span-4 flex justify-end rounded-full">
                <div className="flex justify-end w-72 max-w-96 md:w-full rounded-full">
                    <input 
                        id="search" 
                        name="search" 
                        type="text" 
                        className="
                            w-11/12 h-8 text-sm text-gray-400 bg-gray-100 text-center col-span-8 rounded-full
                            outline-none outline-1 hover:outline-slate-300 focus:outline-slate-300
                            border-none duration-300
                        "
                        max={2}
                        placeholder="Pesquise o id/título da tarefa"
                        value={valueInput}
                        onChange={e => setValueInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && setKeyToDo(valueInput) && setValueInput('')}
                    />       
                    <button type="submit" className="flex justify-center">
                        <Image
                            src={'/searchIcon.svg'}
                            alt="search"
                            width={25}
                            height={20}
                            className="m-auto hover:scale-110 hover:invert duration-300 text-base md:text-lg lg:text-xl"
                            onClick={() => {setKeyToDo(valueInput); setValueInput('')}}
                        />
                    </button>
                </div>
            </div>
            <div className="col-span-1">
            </div>
        </div>
    )
}

export default Header;