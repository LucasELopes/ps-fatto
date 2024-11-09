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
            <div className="bg-primaryColor w-screen h-14 md:h-screen md:w-[6%] flex md:flex-col justify-center items-center fixed bottom-0 z-20">
                <div className="h-[10.5%] h-max-[112px]">
                    <Link href={'/'}  onClick={() => setKeyToDo('')}>
                        <Image
                            className="hover:scale-110 hover:-rotate-12 transition-all duration-500 w-28 md:w-full m-0 fixed md:relative bottom-12 -left-2"
                            src={iconSite}
                            width={500}
                            height={70}
                            alt="Logo"
                            title="Home"
                        />
                    </Link>
                </div>
                <div className="h-full w-full md:p-3  md:mx-0 flex justify-around items-center md:flex-col md:justify-center md:gap-y-8">
                    <div className="md:h-[10%] h-max-[100px]">
                        <Link href={'/charts'}>
                            <Image
                                className="hover:invert hover:scale-110 duration-300 w-4/12 md:w-6/12 max-w-20 m-auto" 
                                src={'/pie-chart.png'}
                                width={400}
                                height={400}
                                alt="Chart"
                                title="Gráficos"
                            />
                        </Link>
                    </div>
                    <div className="md:h-[10%] h-max-[100px]">
                        <Link
                            href={'/onTime'}
                        >
                            <Image 
                                className="hover:invert hover:scale-125 duration-500 w-4/12 md:w-6/12 max-w-20 m-auto hover:-rotate-[360deg]" 
                                src={'/activity.png'} 
                                width={400} 
                                height={400}
                                alt="Done tasks" 
                                title="Tarefas no prazo"
                            />
                        </Link>
                    </div>       
                    <div className="md:h-[10%] h-max-[100px]">
                        <Image 
                            className="hover:invert hover:scale-110 duration-300 w-full md:w-6/12 max-w-20 m-auto cursor-pointer" 
                            src={'/icons8-add-50.png'} 
                            width={400} 
                            height={400}
                            alt="ADD" 
                            onClick={() => {setIsOpen(!isOpen); setTitleModal('Criar Tarefa')}}
                            title="Adicionar tarefa"
                        />
                    </div>
                    <div className="md:h-[10%] max-h-[100px]">
                        <Link
                            href={'/nearDeadLine'}
                        >
                            <Image 
                                className="hover:invert hover:scale-125 duration-300 w-4/12 md:w-6/12 max-w-20 h-auto m-auto hover:-rotate-[360deg]" 
                                src={'/alert.png'} 
                                alt="deadlines tasks"
                                width={400}
                                height={400}
                                title="Tarefas perto do prazo"
                            />
                        </Link>
                    </div>

                    <div className="md;h-[10%] h-max-[100px]">
                        <Link
                            href={'/overdue'}
                        >
                            <Image 
                                className="hover:invert hover:scale-125 duration-500 w-4/12 md:w-6/12 max-w-20 m-auto hover:-rotate-[360deg]" 
                                src={'/pending.png'} 
                                width={400} 
                                height={400}
                                alt="Pending" 
                                title="Tarefas atrasadas"
                            />
                        </Link>
                    </div> 
                </div>
            </div> 
        </>
    )
}

export default SideBar;