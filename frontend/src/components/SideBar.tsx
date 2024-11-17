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
    const {setKeyToDo} = useSearchToDoContext()

    return (
        <div className="relative">
            <div className="bg-primaryColor fixed z-20 
                bottom-0 h-[8%] h-max-[70px] w-screen flex justify-around items-center
                md:h-screen md:w-24 md:flex-col md:py-[5%]
            ">
                <Link href={'/'} onClick={() => setKeyToDo('')} className="md:flex md:justify-center md:items-center">
                    <Image
                        className="
                            transition-all duration-500 w-28 m-0 fixed bottom-[7%] -left-7 z-30 
                            md:hover:scale-110 md:hover:-rotate-12 md:absolute md:top-0 md:left-0
                        "
                        src={iconSite}
                        width={250}
                        height={250}
                        alt="Logo"
                        title="Home"
                    />
                </Link>
                <Link href={'/charts'}>
                    <Image
                        className="hover:invert hover:scale-110 duration-300 w-8/12 max-w-20 m-auto md:w-9/12" 
                        src={'/pie-chart.png'}
                        width={40}
                        height={40}
                        alt="Chart"
                        title="Gráficos"
                    />
                </Link>
                <Link href={'/onTime'}>
                    <Image
                        className="hover:invert hover:scale-110 duration-300 w-8/12 max-w-20 m-auto md:w-9/12 hover:-rotate-[360deg]" 
                        src={'/activity.png'}
                        width={40}
                        height={40}
                        alt="Chart"
                        title="Tarefas dentro do prazo"
                    />
                </Link>
                <button>
                    <Image
                        className="hover:invert hover:scale-110 duration-300 w-9/12 max-w-20 m-auto md:w-10/12" 
                        src={'/add.png'}
                        width={40}
                        height={40}
                        alt="Chart"
                        onClick={() => {setIsOpen(true); setTitleModal('Criar Tarefa')}}
                        title="Adicionar tarefa"
                    />
                </button>
                <Link href={'/nearDeadLine'}>
                    <Image
                        className="hover:invert hover:scale-110 duration-300 w-8/12 max-w-20 m-auto md:w-9/12 hover:-rotate-[360deg]" 
                        src={'/alert.png'}
                        width={40}
                        height={40}
                        alt="Chart"
                        title="Tarefas perto do prazo"
                    />
                </Link>
                <Link href={'/overdue'}>
                    <Image
                        className="hover:invert hover:scale-110 duration-300 w-9/12 max-w-20 m-auto md:w-10/12 hover:-rotate-[360deg]" 
                        src={'/pending.png'}
                        width={40}
                        height={40}
                        alt="Chart"
                        title="Tarefas atrasadas"
                    />
                </Link>
            </div>
        </div>
    )
}

export default SideBar;