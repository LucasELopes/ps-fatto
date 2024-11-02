"use server"

import { deadLineType } from "@/types/deadLine"
import { toDoType } from "@/types/toDo"

export async function allToDo(): Promise<toDoType[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/toDos`)

    if(!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getDeadLines(): Promise<deadLineType> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deadline`)

    if(!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}