import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValueType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}


function App() {

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: v1(),
            title: "What to learn",
            filter: "all"
        },
        {
            id: v1(),
            title: "What to buy",
            filter: "all"
        }
    ])



    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: true},
    ])



    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: true}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }


    function removeTask(id: string) {
        let filteredTask = tasks.filter(t => t.id != id)
        setTasks(filteredTask)
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if(todolist){
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    function changeStatus(id:string, isDone: boolean) {
      let task = tasks.find(t => t.id === id)
        if(task){
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            {
                todolists.map(tl =>{
                    let taskForTodolist = tasks
                    if (tl.filter === "active") {taskForTodolist = tasks.filter(t => t.isDone === false)}
                    if (tl.filter === "completed") {taskForTodolist = tasks.filter(t => t.isDone === true)}

                        return <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={taskForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                        />
                })
            }

        </div>
    );
}


export default App;
