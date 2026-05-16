import React, { useEffect, useState } from 'react'
import { useAppContext } from './Context/AppContext'

const App = () => {

  const [openEdit ,setOpenEdit] = useState(false)
  const [state,setState] = useState("update");
  const [inputData,setInputData] = useState("");
  const [updateTask ,setUpdateTask] = useState({})
  const {tasks,setTasks,addTask} = useAppContext()
  const [updating,setUpdating] = useState("")

const handleChange  = (e)=>{
  setUpdating(e.target.value);
};

const handleSubmit = ()=>{
const updatedTask = tasks.map((task)=>{

    if(task.id === updateTask.id){
      return {...task,Task:updating};
    }
    return task;
  });

  setTasks(updatedTask);
  setOpenEdit(false)
}


//delete task
const handleDelete = (id)=>{
  setTasks(tasks.filter((task)=>task.id !== id));
}

  return (
    <div className='flex flex-col justify-center items-center '>
      <div className='mb-5 flex justify-between space-x-5 mt-30 max-w-xl md:min-w-5xl'>
      <p className='flex  text-center px-2 py-2 rounded  bg-cyan-600 text-white'>TODO APP PERNSTACK</p>
      <button className='bg-cyan-600 px-2 py-1 rounded-xl text-white' onClick={()=>{setState("addnew"); setOpenEdit(true)}}>Add new +</button>
      </div>
      <div className='flex flex-col items-start py-4 space-y-5  px-3 bg-gray-50'>
    
      {
        tasks.length > 0 ?
        tasks.map((task,index)=>(

          <div className='md:flex flex-wrap border-b p-4 justify-between  px-3  md:min-w-5xl text-start '>
          <p className='text-md font-bold'>{task.Task}</p>
          <div className='flex flex-wrap space-x-3'>
          <button className='bg-green-600 text-white text-sm px-2 py-1 rounded ' onClick={()=>{setOpenEdit(true) ; setUpdateTask(task); setState("update")}}>Edit</button>
          <button  className='bg-red-600 text-white text-sm px-2 py-1 rounded ' onClick={()=>handleDelete(task.id)}>Delete</button>
          </div>
          </div>
        ))
        :
        <p className='flex  text-center px-2 py-2 rounded  bg-cyan-600 text-white'>There's no Task</p>
      }
      
      
      </div>

      {/* editModel */}
      {openEdit &&
      <div className=' flex flex-col fixed inset-0  bg-black/90 top-0 bottom-0  justify-center items-center' onClick={(e)=>{setOpenEdit(false)}}>
      <div className='flex flex-col  p-10 bg-gray-300 rounded-2xl' onClick={(e)=>e.stopPropagation()}>
        {
          state === "update" ?
          <input onChange={handleChange} defaultValue={updateTask ? updateTask.Task : ""} type="text" className='bg-white px-3 py-2 rounded text-black font-bold'/>
          :
          <input onChange={(e)=>setInputData(e.target.value)} placeholder='add task new....' type="text" className='bg-white px-3 py-2 rounded text-black font-bold'/>
        }
        <button onClick={()=>{state === "update" ? handleSubmit : addTask(inputData,setOpenEdit)}} className='bg-green-600 text-white text-sm px-2 py-1 rounded mt-5'>{state === "update" ? "Edit" : "Add"}</button>
      </div>
      </div>
      }
    </div>
  )
}

export default App