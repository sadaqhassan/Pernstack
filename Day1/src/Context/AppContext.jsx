import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppContextProvider  = ({children}) => {

    const [tasks,setTasks] = useState([
    ]);
    const [tasksData,setTasksData] = useState([
    ]);


const handleChange = (task)=>{
    setTasks()
}

const fetchTasks = async ()=>{
        const res = await fetch('http://localhost:4000/get-tasks',{
            method:"GET"
        })
        const data = await res.json();
        setTasksData(data.data);
        console.log(data.data);
}

useEffect(()=>{
    fetchTasks();
    console.log(tasksData)
},[])

//addTask 
const addTask = async(inputData,setOpenEdit)=>{
    if(inputData){
    setTasks((prev)=>([...prev,{Task:inputData,id:tasks.length += 1}]))
    const res = await fetch("http://localhost:4000/add-task",{
        method:"post",
        headers:{"content-type"  : "application/json"},
        body:JSON.stringify({name:inputData})
    })
    const data = await res.json();
    if(data.success){
    fetchTasks()
    }
    setOpenEdit(false)
}
    
}






//updateTask
const TheupdateTask = async(updating,setOpenEdit)=>{
    const res = await fetch(`http://localhost:4000/update-task/${id}`,{
        method:"PUT",
        headers:{"content-type"  : "application/json"},
        body:JSON.stringify({name:inputing})
    })
    const data = await res.json();
    if(data.success){
    fetchTasks()
    toast.success(data.message);
    }

  setOpenEdit(false)
}

//delete task
const deleteTask = async(id)=>{
  setTasks(tasksData.filter((task)=>task.id !== id));

  const res = await fetch(`http://localhost:4000/delete-task/${id}`,{
            method:"DELETE"
        })
        const data = await res.json();
        toast.success(data.message);
        fetchTasks();
    }

    const value = {
        tasks,setTasks,addTask,
        TheupdateTask,deleteTask,tasksData
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext =()=> useContext(AppContext);