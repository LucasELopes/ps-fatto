import { HandleModalContext, useHandleModalContext } from "@/app/contexts/HandleModalContext";
import { useSearchToDoContext } from "@/app/contexts/SearchToDoContext";
import Image from "next/image";
import Link from "next/link";
import {useContext } from "react";

type Props = {
    iconSite: string
}

const SideBar = ({iconSite}: Props) => {

    const {isOpen, setIsOpen, setTitleModal} = useHandleModalContext()
    const {keyTodo, setKeyToDo} = useSearchToDoContext()
    return (
        <>
            <div className="bg-primaryColor h-screen w-14 md:w-[6%] flex flex-col items-center md:fixed">
                <div className="h-[10.5%] w-full h-max-[112px]">
                    <Link href={'/'} className="w-full" onClick={() => setKeyToDo('')}>
                        <Image
                            className="hover:rotate-[360deg] transition-all duration-500 w-11/12"
                            src={iconSite}
                            width={500}
                            height={500}
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="h-full w-full p-3 flex flex-col justify-center items-center gap-y-8">
                    <div className="h-[10%] h-max-[100px]">
                        <Link href={'/charts'}>
                            <Image
                                className="hover:invert hover:scale-110 duration-300 w-6/12 m-auto" 
                                src={'/pie-chart.png'}
                                width={400}
                                height={400}
                                alt="Chart"
                            />
                        </Link>
                    </div>
                    <div className="h-[10%] h-max-[100px]">
                        <Link
                            href={'https://google.com'}
                            target="_blank"
                        >
                            <Image 
                                className="hover:invert hover:scale-110 duration-300 w-6/12 m-auto" 
                                src={'/activity.png'} 
                                width={400} 
                                height={400}
                                alt="Done tasks" 
                            />
                        </Link>
                    </div>       
                    <div className="h-[10%] h-max-[100px]">
                        <Image 
                            className="hover:invert hover:scale-110 duration-300 w-11/12 m-auto cursor-pointer" 
                            src={'/icons8-add-50.png'} 
                            width={400} 
                            height={400}
                            alt="ADD" 
                            onClick={() => {setIsOpen(!isOpen); setTitleModal('Criar Tarefa')}}
                        />
                    </div>
                    <div className="h-[10%] max-h-[100px]">
                        <Link
                            href={'https://google.com'}
                            target="_blank"
                        >
                            <Image 
                                className="hover:invert hover:scale-110 duration-300 w-6/12 h-auto m-auto" 
                                src={'/alert.png'} 
                                alt="deadlines tasks"
                                width={400}
                                height={400}
                            />
                        </Link>
                    </div>

                    <div className="h-[10%] h-max-[100px]">
                        <Link
                            href={'https://google.com'}
                            target="_blank"
                        >
                            <Image 
                                className="hover:invert hover:scale-110 duration-300 w-6/12 m-auto" 
                                src={'/pending.png'} 
                                width={400} 
                                height={400}
                                alt="Pending" 
                            />
                        </Link>
                    </div> 
                </div>
            </div> 
        </>
    )
}

export default SideBar;