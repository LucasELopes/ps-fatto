import { allToDo } from "@/actions/toDo";
import { toDoType } from "@/types/toDo"
import { useEffect, useState } from "react";

const ListToDos = () => {
    
    const [toDos, setToDos] = useState<toDoType[]>([])
    const currentDate = new Date()

    useEffect(() => {allToDo()
        .then((data) => setToDos(data))
    },[])

    return (
        <div className="w-6/12 h-full">
            {toDos.length > 0 &&
                <div className="grid grid-cols-5 gap-2 text-center">
                    <div className="col-span-1">
                        ID {/*  
                                O respectivo id (indíce do array das tarefas) é apenas visual, 
                                pois no backend é utilizado uuId, entretanto para ficar mais agradável de se ver o id foi utilizado.
                            */}
                    </div>
                    <div className="col-span-2">
                        Nome
                    </div>
                    <div className="col-span-1">
                        Custo
                    </div>
                    <div className="col-span-1">
                        Data limite
                    </div>
                    {   
                        toDos.map((toDo, index) => (
                            <div key={toDo.id} className="col-span-5 grid grid-cols-5 my-2">
                                <div className="col-span-1 text-nowrap text-ellipsis overflow-hidden">
                                    {index}
                                </div>
                                <div className="col-span-2 text-nowrap text-ellipsis overflow-hidden">
                                    {toDo.name}
                                </div>
                                <div className="col-span-1 text-nowrap text-ellipsis overflow-hidden">
                                    {toDo.cost}
                                </div>
                                <div className={
                                        `col-span-1 text-nowrap text-ellipsis overflow-hidden font-medium
                                        ${
                                            currentDate > new Date(toDo.due_date) ? 'text-red-400 font-bold' : 
                                            new Date(toDo.due_date).getTime() - currentDate.getTime() <= 86400000  ? 'text-yellow-400 font-bold' : 'text-green-400'
                                        }`
                                }>
                                    {new Date(toDo.due_date).toLocaleDateString()}
                                </div>
                            </div>
                        ))
                    }
                </div> 
            }
            {/* <table>
                <thead>
                    <tr>
                        <th>Identificador</th>
                        <th>Nome</th>
                        <th>Custo</th>
                        <th>Data limite</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        toDos.map((toDo, index) => (
                            <tr key={toDo.id}>
                                <th>{index}</th>
                                <td>{toDo.name}</td>
                                <td>{toDo.cost}</td>
                                <td>{new Date(toDo.due_date).toLocaleDateString()}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table> */}
        </div>
    )

}

export default ListToDos