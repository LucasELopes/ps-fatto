"use server"

import axios, { AxiosError, AxiosResponse } from "axios" 
import { deadLineType } from "@/types/deadLine"
import { toDoType } from "@/types/toDo"
import { api } from "@/utils/api"
import { costsToDosMonthType } from "@/types/costsTodosMonth"
import { costsToDosType } from "@/types/costsTodos"
import { headers } from "next/headers"
import { error } from "console"

export async function allToDo(): Promise<toDoType[]> {
    const res = await api.get('/toDos')
    return res.data
}

export async function getDeadLines(): Promise<deadLineType> {
    const res = await api.get('/deadline')
    return res.data
}

export async function getOnTime(): Promise<toDoType[]> {
    const res = await api.get('/getOnTime')
    return res.data
}

export async function getNearDeadLine(): Promise<toDoType[]> {
    const res = await api.get('/getNearDeadLine')
    return res.data
}

export async function getOverDue(): Promise<toDoType[]> {
    const res = await api.get('/getOverdue')
    return res.data
}

export async function  getCostsMonthToDos(): Promise<costsToDosMonthType> {
    const res = await api.get('/costsToDosMonth')
    return res.data
}

export async function  getCostsToDos(): Promise<costsToDosType> {
    const res = await api.get('/costsToDos')
    return res.data
}

export async function searchToDo(param: string | number): Promise<toDoType[]|null> {
    try {
        const res = await api.get(`/toDos/${param}`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export async function storeToDo(form: FormData) {
    try {
        const resp = await api.post('/toDos', form)
        return resp.data
    } catch (error) {
        if(error instanceof AxiosError) {
            if(error.status == 422) {
                throw new Error('Nome da tarefa já existe!')
            }
            else {
                throw new Error('Não foi possível criar a tarefa!')
            }
        }        
    }
}

export async function updateToDo(form: FormData, id: string | number) {
    try {
        form.append('_method', 'PUT')
        const resp = await api.post(`/toDos/${id}`, form);
        return resp.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            if(error.status == 422) {
                throw new Error('Nome da tarefa já existe!')
            }
            else {
                throw new Error('Não foi possível atualizar a tarefa!')
            }
        } 
    }
}


export async function deleteToDo(param: string | number) {
    const resp = await api.delete(`/toDos/${param}`)
    return resp.data
}

