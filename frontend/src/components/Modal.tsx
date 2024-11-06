import { useHandleModalContext } from "@/app/contexts/HandleModalContext"
import { toDoType } from "@/types/toDo"
import { read } from "fs"
import Image from "next/image"
import { useState, useEffect } from "react"

type Props = {
    modalTitle: string
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    toDoInformation?: toDoType
    readonly: boolean
}

const Modal = ({ modalTitle, handleSubmit, toDoInformation, readonly }: Props) => {
    
    const currentDate = new Intl.DateTimeFormat('en-CA').format(new Date())

    const { isOpen, setIsOpen, setTitleModal, setToDoInformation, setReadOnly, readOnly } = useHandleModalContext()

    const [toDoStream, setToDoStream] = useState<toDoType>({
        id: toDoInformation?.id || "",
        name: toDoInformation?.name || "",
        description: toDoInformation?.description || "",
        cost: toDoInformation?.cost || 0,
        order: toDoInformation?.order || 0,
        due_date: toDoInformation?.due_date || currentDate,
    })

    useEffect(() => {
        if (toDoInformation) {
            setToDoStream({
                id: toDoInformation.id,
                name: toDoInformation.name,
                description: toDoInformation.description,
                cost: toDoInformation.cost,
                order: toDoInformation.order,
                due_date: toDoInformation.due_date,
            })
        }
    }, [toDoInformation])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setToDoStream(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="bg-gray-400 bg-opacity-55 w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
            <dialog open 
                className="
                    w-3/12 m-auto backdrop:opacity-  
                    border border-indigo-400 rounded-lg 
                    px-5 py-2 flex flex-col justify-center
                    relative shadow-lg
                "
            >
                <div className="absolute top-[-6px] right-[-6px] rounded-full p-1">
                    <Image
                        src={'/close.png'}
                        alt="close"
                        width={25}
                        height={25}
                        className="cursor-pointer hover:scale-120 duration-300"
                        onClick={() => { setIsOpen(!isOpen); setTitleModal('Criar Tarefa'); setToDoInformation(null); setReadOnly(false) }}
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
                            readOnly={readonly}
                            placeholder="Insira o nome da tarefa"
                            className="border border-indigo-200 rounded-lg px-2 text-center font-normal"
                            value={toDoStream.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label htmlFor="description" className="flex flex-col text-gray-400 font-bold">
                        Descrição da tarefa
                        <textarea 
                            id="description" 
                            name="description" 
                            readOnly={readonly}
                            placeholder="Insira a descrição da tarefa"
                            className="border border-indigo-200 rounded-lg px-2 text-center font-normal min-h-[100px] max-h-[200px]"
                            value={toDoStream.description}
                            onChange={handleInputChange}
                            maxLength={255}
                        />
                    </label>
                    <label htmlFor="cost" className="flex flex-col text-gray-400 font-bold">
                        <div>
                            Custo da tarefa<span className="text-red-300">*</span> 
                        </div>
                        <input 
                            id="cost" 
                            type="number" 
                            name="cost"
                            readOnly={readonly}
                            value={toDoStream.cost}
                            onChange={handleInputChange}
                            placeholder="Insira o custo da tarefa"
                            className="border border-indigo-200 rounded-lg px-2 text-center font-normal"
                            required
                        />
                    </label>
                    <label htmlFor="due_date" className="flex flex-col text-gray-400 font-bold">
                        <div>
                            Data de entrega<span className="text-red-300">*</span> 
                        </div>
                        <input 
                            id="due_date" 
                            type="date" 
                            name="due_date"
                            readOnly={readonly}
                            value={new Intl.DateTimeFormat('en-CA')
                                    .format(toDoStream?.due_date ? new Date(toDoStream.due_date)
                                    .getTime() + 86400000 
                                    : new Date().getTime() + 86400000)
                                }
                            onChange={handleInputChange}
                            placeholder="Insira o nome da tarefa"
                            className="border border-indigo-200 rounded-lg px-2 text-center font-normal"
                            min={currentDate}
                            required
                        />
                    </label>
                    {!readonly &&
                        <button type="submit" className="bg-indigo-600 text-indigo-200 h-8 font-bold max-w-40 w-6/12 m-auto my-2 rounded-lg hover:scale-105 hover:text-indigo-200 duration-300">
                            Enviar
                        </button>
                    }
                    {
                        readonly &&
                        <div className="h-2">

                        </div>
                    }
                </form>
            </dialog>
        </div>
    )
}

export default Modal
