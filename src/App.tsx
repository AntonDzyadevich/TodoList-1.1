import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValueType = "all" | "active" | "completed"


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: true},
    ])

    let [filter, setFilter] = useState<"all" | "active" | "completed">("all")
    let taskForTodolist = tasks

    if (filter === "active") {
        taskForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.isDone === true)
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: true}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }


    function removeTask(id: string) {
        let filteredTask = tasks.filter(t => t.id != id)
        setTasks(filteredTask)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
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
            <Todolist title="What to learn"
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}


export default App;
