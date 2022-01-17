import {TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type:  'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}


type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType


export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state,
                {
                    id: v1(),
                    title: action.title,
                    filter: "all"
                }]
        }
        case 'CHANGE-TODOLIST-TITLE':{
           const  todolist = state.find(tl => tl.id === action.id)
            if(todolist) {
                todolist.title = action.title
            }
           return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }
}
