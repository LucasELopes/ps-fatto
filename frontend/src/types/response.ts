import { AxiosResponse } from "axios"

export type ResponseToDo = {
    sucess: boolean,
    message: AxiosResponse|string
}