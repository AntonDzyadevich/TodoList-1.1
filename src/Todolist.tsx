import React, {ChangeEvent, useState} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title:string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean,todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (id: string) => void
 }

 
export function Todolist(props: TodolistPropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }



    const onAllClickHandler = () => {props.changeFilter("all", props.id)}
    const onActiveClickHandler = () => {props.changeFilter("active", props.id)}
    const onCompletedClickHandler = () => {props.changeFilter("completed",props.id)}


    return (
        <div className="Todolist">

            <h3>{props.title}</h3>
            <button className="remBut" onClick={removeTodolist}>X</button>

         <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map(t => {

                        const onClickHandler =() => {
                            props.removeTask(t.id, props.id)
                        }

                       const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                           let newIsDoneValue = e.currentTarget.checked
                           props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                       }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>X</button>
                        </li>
                    })

                }

            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}