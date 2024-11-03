import { createContext, useContext } from "react"

type SearchToDoContext = {
    keyTodo: number|string|null
    setKeyToDo: (value: number|string|null) => void
}

export const SearchToDoContext = createContext<SearchToDoContext|null>(null)

export const useSearchToDoContext = () => {
    const context = useContext(SearchToDoContext)

    if(!context) {
        throw new Error("SearchToDoContext deve ser usado dentro de um SearchToDoContext.Provider");
    }

    return context
}