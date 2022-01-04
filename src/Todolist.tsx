import React, {ChangeEvent, useState} from "react";
import {FilterValueType} from "./App";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title:string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
 }


export function Todolist(props: TodolistPropsType) {

    let[title, setTittle] = useState<string>("")

    let[error, setError] = useState<string | null>(null)


    const addTask = () => {
        if(title.trim() !== ""){
            props.addTask(title)
            setTittle("")
        }else{
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTittle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: any) =>{
        setError(null)
        if(e.charCode === 13) {
            addTask()
        }
    }

    const onAllClickHandler = () => {props.changeFilter("all")}
    const onActiveClickHandler = () => {props.changeFilter("active")}
    const onCompletedClickHandler = () => {props.changeFilter("completed")}


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button  onClick={addTask}>+</button>
                {error && <div className = "error-message">{error}</div>}
            </div>

            <ul>
                {
                    props.tasks.map(t => {

                        const onClickHandler =() => {
                            props.removeTask(t.id)
                        }

                       const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                           let newIsDoneValue = e.currentTarget.checked
                           props.changeTaskStatus(t.id, newIsDoneValue)
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