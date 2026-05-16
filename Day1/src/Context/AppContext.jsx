import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider  = ({children}) =>{

    const [tasks,setTasks] = useState([
        {id:1, Task:"Reading juz Qura,an"},
        {id:2, Task:"making haoot and outd"},
        {id:3, Task:"Making practice pernstack"},
        {id:4, Task:"making d"}
    ]);


const handleChange = (task)=>{
    setTasks()
}


    const value = {
        tasks,setTasks
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}


export const useAppContext =()=> useContext(AppContext);