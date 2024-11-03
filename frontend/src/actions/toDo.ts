"use server"

import axios, { AxiosResponse } from "axios" 
import { deadLineType } from "@/types/deadLine"
import { toDoType } from "@/types/toDo"
import { api } from "@/utils/api"

export async function allToDo(): Promise<toDoType[]> {
    const res = await api.get('/toDos')
    return res.data
}

export async function getDeadLines(): Promise<deadLineType> {
    const res = await api.get('/deadline')
    return res.data
}

export async function searchToDo(param: string|number): Promise<toDoType> {
    const res = await api.get(`/toDos/${param}`)
    return res.data
}

export async function storeToDo(form: FormData) {
    const resp = await api.post('/toDos', form)
}