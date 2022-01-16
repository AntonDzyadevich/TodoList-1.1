import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
    changeTodolistTitle: (id: string, newTitle: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
 }


export function Todolist(props: TodolistPropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle )
    }

    const onAllClickHandler = () => {props.changeFilter("all", props.id)}
    const onActiveClickHandler = () => {props.changeFilter("active", props.id)}
    const onCompletedClickHandler = () => {props.changeFilter("completed",props.id)}


    return (
        <div className="Todolist">

            <h3>
                <EditableSpan value={props.title} onChange={changeTodolistTitle} />
                <button onClick={removeTodolist}>X</button>
            </h3>


         <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map(t => {

                        const onClickHandler =() => {
                            props.removeTask(t.id, props.id)
                        }

                       const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                           let newIsDoneValue = e.currentTarget.checked
                           props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                       }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler} />
                           <EditableSpan value={t.title}
                                         onChange={onChangeTitleHandler}/>
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