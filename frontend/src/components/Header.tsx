'use client'

import { searchToDo } from "@/actions/toDo";
import { useSearchToDoContext } from "@/app/contexts/SearchToDoContext";
import { toDoType } from "@/types/toDo";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const Header = () => {
    
    const [valueInput, setValueInput] = useState<string|number>('')
    const {setKeyToDo} = useSearchToDoContext()

    return (
        <div
        className="
            h-16 bg-secondColor
            flex-col justify-between items-center
            md:grid md:grid-cols-12
            md:items-center md:justify-center
        "
        >
            <div className="col-span-6 flex justify-center">
                <Link
                    onClick={() => {setKeyToDo(''); setValueInput('')}}
                    href="/"
                    className="
                        inline
                        text-xl md:text-3xl italic text-purple-50
                        col-span-6 text-center hover:scale-110 
                        hover:text-purple-200 duration-300 font-bold
                        hover:rotate-2
                    "
                >
                    PRONTO!
                </Link>
            </div>
            <div className="col-span-6 flex justify-center items-center">
                <div className="
                    bg-gray-100 flex justify-center items-center
                    border-2 border-secondColor rounded-xl px-2 py-1 outline-none
                    max-w-72 w-11/12 h-8
                    md:max-w-xs hover:border-primaryColor focus:border-primaryColor 
                ">
                    <input
                        type="text"
                        className="
                            bg-gray-100
                            outline-none border-none
                            text-center 
                            w-full
                        "
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && setKeyToDo(valueInput) && setValueInput('')}
                        placeholder="Pesquise o id ou nome da tarefa"
                    />
                    <Image
                        src={'/searchIcon.svg'}
                        alt="search"
                        width={25}
                        height={20}
                        className="hover:scale-110 duration-300 cursor-pointer"
                        onClick={() => {setKeyToDo(valueInput); setValueInput('')}}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header;