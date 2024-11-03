import { storeToDo } from "@/actions/toDo"
import { useHandleModalContext } from "@/app/contexts/HandleModalContext"
import Image from "next/image"
import { useState } from "react"


type Props = {
    modalTitle: string
}

const Modal = ({modalTitle}: Props) => {
    
    const currentDate = new Date().toISOString().split('T')[0]
    const {isOpen, setIsOpen, titleModal, setTitleModal} = useHandleModalContext()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault()
        const formData = new FormData(e.currentTarget);
        try {
            storeToDo(formData)
            setIsOpen(false)
        } catch (error) {
            console.log('Erro ao enviar tarefa: ', error)
        }
    }

    return (
        <div className="bg-gray-400 bg-opacity-55 w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
            <dialog open 
                className="
                    w-3/12 m-auto backdrop:opacity-  
                    border border-indigo-400 rounded-lg 
                    px-5 py-2 flex flex-col justify-center
                    relative
                "
            >
                <div className="absolute top-[-6px] right-[-6px] rounded-full p-1">
                    <Image
                        src={'/close.png'}
                        alt="close"
                        width={25}
                        height={25}
                        className="cursor-pointer hover:scale-120 duration-300"
                        onClick={() =>{ setIsOpen(!isOpen); setTitleModal('Criar Tarefa')}}
                    />
                </div>   
                <div>
                    <h2 className="font-bold text-indigo-400 text-3xl">{modalTitle}</h2>
                </div>
                <form method="post" onSubmit={handleSubmit} className="w-11/12 h-5/6 m-auto my-1 flex flex-col justify-around gap-5">
                    <label htmlFor="name" className="flex flex-col text-gray-400 font-bold">
                        <div>
                            Título da tarefa<span className="text-red-300">*</span> 
                        </div>
                        <input 
                            id="name" 
                            type="text" 
                            name="name" 
                            placeholder="Insira o nome da tarefa"
                            className="border border-indigo-200 rounded-lg px-2 text-center font-normal"
                            required
                        />
                    </label>
                    <label htmlFor="name" className="flex flex-col text-gray-400 font-bold">
                        Descrição da tarefa
                        <textarea 
                            id="name" 
                            name="description" 
                            placeholder="Insira a descrição da tarefa"
                            className="border border-indigo-200 rounded-lg px-2 text-center font-normal min-h-[100px] max-h-[200px]"
                            maxLength={255}
                        />
                    </label>
                    <label htmlFor="name" className="flex flex-col text-gray-400 font-bold">
                        <div>
                            Custo da tarefa<span className="text-red-300">*</span> 
                        </div>
                        <input 
                            id="name" 
                            type="number" 
                            name="cost" 
                            placeholder="Insira o custo da tarefa"
                            className="border border-indigo-200 rounded-lg px-2 text-center font-normal"
                            required
                        />
                    </label>
                    <label htmlFor="name" className="flex flex-col text-gray-400 font-bold">
                        <div>
                            Data de entrega<span className="text-red-300">*</span> 
                        </div>
                        <input 
                            id="name" 
                            type="date" 
                            name="due_date" 
                            placeholder="Insira o nome da tarefa"
                            className="border border-indigo-200 rounded-lg px-2 text-center font-normal"
                            min={currentDate}
                            required
                        />
                    </label>

                    <button type="submit" className="bg-indigo-400 h-8 font-bold max-w-40 w-6/12 m-auto my-2 rounded-lg hover:scale-105 hover:text-indigo-200 duration-300">
                        Enviar
                    </button>
                </form>
            </dialog>
        </div>
    )
}

export default Modal
