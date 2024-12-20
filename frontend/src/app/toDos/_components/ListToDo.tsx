import { allToDo, searchToDo, updateToDo } from "@/actions/toDo";
import { toDoType } from "@/types/toDo";
import { useEffect, useState } from "react";
import CardToDo from "./CardToDo";
import {DragDropContext, Droppable} from '@hello-pangea/dnd'


type Props = {
    toDosProps: toDoType[]
}

const ListToDos = ({toDosProps}: Props) => {
    
    const [toDosModify, setToDosModify] = useState<toDoType[]>([])
    const [toDos, setToDos] = useState<toDoType[]>(toDosProps)

    useEffect(() => {
        if (toDosModify && toDosModify.length > 0) {
            toDosModify.map(async (toDo) => {
                const formData = new FormData();
                formData.append('order', String(toDo.order));
                await updateToDo(formData, toDo.id);
            });
            setToDosModify([])
        }
        allToDo().then((data) => setToDos(data))
    }, [toDosModify])

    function reorder(list:toDoType[], startIndex: number, endIndex: number) {

        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)

        let startOrder = removed.order
        let endOrder = list[endIndex].order

        let toDosModifyArray:toDoType[] = [];

        if(startIndex <= endIndex) {
            for(let i = startIndex; i <= endIndex; i++) {
                
                if(i !== endIndex) {
                    toDosModifyArray.push({...list[i+1], order: list[i].order})
                }
                else{
                    toDosModifyArray.push({...removed, order: endOrder})
                }
            }
        }
        else {            
            for(let i = endIndex; i < startIndex; i++) {               
                toDosModifyArray.push({...list[i], order: list[i+1].order})
            }
            toDosModifyArray.push({...removed, order: endOrder})
        }

        // console.log(startOrder)
        // console.log(endOrder)
        // console.log(list)
        // console.log(result)
        // console.log(toDosModifyArray)

        setToDosModify(toDosModifyArray)
        result.splice(endIndex, 0, removed)

        return result;
    }    

    const onDragEnd = (result: any) => {
        if(!result.destination) {
            return 
        }

        console.log(result.source.index)
        console.log(result.destination.index)
        const items = reorder(toDos, result.source.index, result.destination.index)
        setToDos(items)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks" type="list" direction="vertical">
                {(provided) => (
                    <div className="mb-7"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {toDos.length > 0 && toDos.map((toDo, index) => ( 
                            <CardToDo key={toDo.id} toDo={toDo} index={index}/>
                        ))}
                    {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>   
    )
}
export default ListToDos;
