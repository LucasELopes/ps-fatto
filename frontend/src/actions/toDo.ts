"use server"

interface ToDo {
    id: string,
    name: string,
    due_date: Date,
    cost: number,
    order: Date
}

export async function allToDo() {
    const data = await fetch(`${process.env.APP_URL}/toDos`)
    return JSON.stringify(data)
}