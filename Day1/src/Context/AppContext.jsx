import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider  = ({children}) =>{

    const [tasks,setTasks] = useState([
    ]);


const handleChange = (task)=>{
    setTasks()
}

//addTask 
const addTask = (inputData,setOpenEdit)=>{
    if(inputData){
        setTasks((prev)=>([...prev,{Task:inputData,id:tasks.length += 1}]))
    }
    setOpenEdit(false)
}

//updateTask
const TheupdateTask = (updating,updatTask,setOpenEdit)=>{
const updatedTask = tasks.map((task)=>{

    if(task.id === updatTask.id){
    return {...task,Task:updating};
    }
    return task;
  });

  setTasks(updatedTask);
  setOpenEdit(false)
}

//delete task
const deleteTask = (id)=>{
  setTasks(tasks.filter((task)=>task.id !== id));
}

    const value = {
        tasks,setTasks,addTask,
        TheupdateTask,deleteTask
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}


export const useAppContext =()=> useContext(AppContext);