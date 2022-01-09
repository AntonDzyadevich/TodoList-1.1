import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type FilterValueType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}


type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()






    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all"
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all"
        }
    ])



    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "HTML&CSS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true}
        ]
    })


    function removeTask(id: string, todolistId: string) {
      let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id != id)
        setTasks({...tasks})
    }

    function addTask(title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = {id: v1(), title: title, isDone: true}
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})

    }

    function changeStatus(id:string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(tl => tl.id === todolistId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }


    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if(todolist){
            todolist.filter = value
            setTodolists([...todolists])
        }

    }


    function  removeTodolist(id: string) {
        setTodolists(todolists.filter(t => t.id != id))
        delete tasks[id]
        setTasks({...tasks})
    }


    function addTodolist(title: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: "all"}
        setTodolists([newTodolist,...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }



    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl =>{
                    let allTodolistTasks = tasks[tl.id]
                    let taskForTodolist = allTodolistTasks
                    if (tl.filter === "active") {taskForTodolist = allTodolistTasks.filter(t => t.isDone === false)}
                    if (tl.filter === "completed") {taskForTodolist = allTodolistTasks.filter(t => t.isDone === true)}

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
                            removeTodolist={removeTodolist}
                        />
                })
            }

        </div>
    );
}


export default App;
