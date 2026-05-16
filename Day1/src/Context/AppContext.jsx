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

    const value = {
        tasks,setTasks,addTask
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}


export const useAppContext =()=> useContext(AppContext);