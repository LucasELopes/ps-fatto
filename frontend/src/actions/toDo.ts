"use server"

import axios, { AxiosResponse } from "axios" 
import { deadLineType } from "@/types/deadLine"
import { toDoType } from "@/types/toDo"
import { api } from "@/utils/api"
import { costsToDosType } from "@/types/costsTodos"

export async function allToDo(): Promise<toDoType[]> {
    const res = await api.get('/toDos')
    return res.data
}

export async function getDeadLines(): Promise<deadLineType> {
    const res = await api.get('/deadline')
    return res.data
}

export async function searchToDo(param: string | number): Promise<toDoType|null> {
    try {
        const res = await api.get(`/toDos/${param}`);
        return res.data;
    } catch (error) {
        return null;
    }
}


export async function storeToDo(form: FormData) {
    const resp = await api.post('/toDos', form)
    return resp.data
}

export async function updateToDo(form: FormData, id: string|number): Promise<toDoType> {
    const resp = await api.put(`/toDos/${id}`, form)

    return resp.data
}