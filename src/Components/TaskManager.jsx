import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, deleteTask, dragTask, addList } from '../Redux/taskSlice'
import { PlusCircle, X, Trash2 } from 'lucide-react'
import OverlayModel from './Overlay'

function TaskManager() {
  const [open, setOpen] = useState(false)
  const [listTitle, setListTitle] = useState('')
  const [openList, setOpenList] = useState(false)
  const [assignTo, setAssignTo] = useState()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const taskBoard = useSelector((state) => state.task)

  console.log(taskBoard)

//   const OverlayModel = () => {
//     const handleSubmit = (e) => {
//       e.preventDefault()
//       if (!title.trim()) return
//       dispatch(addTask({ id: Date.now(), title: title.trim(), description: description.trim() , assignTo: assignTo }))
//       setOpen(false)
//       setTitle('')
//       setDescription('')
//       setAssignTo('')
//     }

//     return (
//       <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
//         <div className='w-full max-w-md bg-white rounded-xl shadow-2xl p-6 relative'>
//           <button onClick={()=>setOpen(false)} className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'>
//             <X size={24}/>
//           </button>
//           <h2 className='text-2xl font-bold text-gray-800 mb-6'>Add New Task</h2>
//           <form onSubmit={handleSubmit} className='space-y-4'>
//             <div>
//               <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
//               <input 
//                 className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
//                 type='text'
//                 value={title}
//                 placeholder='Task title'
//                 onChange={(e)=>{
                    
//                     setTitle(e.target.value)}}
//               />
//             </div>
//             <div>
//               <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
//               <textarea 
//                 className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]'
//                 value={description}
//                 placeholder='Task description'
//                 onChange={(e)=>setDescription(e.target.value)}
//               />
//             </div>

//             <label className='block text-sm font-medium text-gray-700 mb-1'>Assign to: </label>
//             <select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500' value={assignTo} onChange={(e)=>setAssignTo(e.target.value)}>
//               {
//                 ["Anirudh", "Aryan", "Aman", "Lavish"].map((assignTo)=>(
//                   <option key={assignTo} value={assignTo}>{assignTo}</option>
//                 ))
//               }
//             </select>
//             <button type='submit' className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2'>
//               <PlusCircle size={18}/>
//               <span>Add Task</span>
//             </button>
//           </form>
//         </div>
//       </div>
//     )
//   }

  const handleDragStart = (e, task, fromColumn) => {
    e.dataTransfer.setData('task', JSON.stringify({...task, fromColumn}))
  }

  const handleDragOver = (e) => e.preventDefault()

  const handleDrop = (e, toColumn) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('task')
    if(!data) return
    const task = JSON.parse(data)
    if(task.fromColumn!==toColumn){
      dispatch(dragTask({fromColumn:task.fromColumn,toColumn,task}))
    }
  }

  const handleDeleteTask = (id, column) => {
    dispatch(deleteTask({column, taskId:id}))
    alert('Task deleted')
  }

  const handleAddList = () => {
    if(!listTitle.trim()) return
    dispatch(addList({name:listTitle.trim()}))
    setListTitle('')
    setOpenList(false)
  }

  return (
    <div className='min-h-screen p-6'>
      <div className='flex flex-wrap gap-6'>
        {taskBoard.map((column, i)=>(
          <div key={i} className='flex-1 min-w-[300px] max-w-[350px]' onDragOver={handleDragOver} onDrop={(e)=>handleDrop(e,column.name)}>
            <div className='bg-white rounded-xl shadow-md overflow-hidden'>
              <div className='p-4'>
                <h2 className='text-lg font-semibold'>{column.name}</h2>
              </div>
              <div className='p-4 space-y-3 min-h-[200px] max-h-[70vh] overflow-y-auto'>
                {column.tasks.map((task, index)=>(
                  <div key={task.id || index} draggable onDragStart={(e)=>handleDragStart(e,task,column.name)} className='relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md cursor-move group'>
                    <div className='flex justify-between items-start'>
                      <h3 className='font-medium text-gray-900'>{task.title}</h3>
                      <div className='flex opacity-0 group-hover:opacity-100'>
                        <button onClick={()=>handleDeleteTask(task.id,column.name)} className='text-gray-400 hover:text-red-500'>
                          <Trash2 size={16}/>
                        </button>

                       
                      </div>
                    </div>
                    {task.description && <p className='mt-2 text-sm text-gray-600'>{task.description}</p>}
                  { task.assignTo &&  <div className='text-sm z-50 absolute bottom-2 right-2 bg-red-400 p-1 rounded-lg text-white'>{task.assignTo}</div>}
                  </div>
                ))}
                {column.name==='To-do' && (
                  <button onClick={()=>setOpen(true)} className='w-full flex items-center justify-center py-2 px-4 text-blue-600 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg'>
                    <PlusCircle size={18}/>
                    <span>Add Task</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className='flex justify-center p-2 bg-white rounded-lg'>
          {!openList && <button onClick={()=>setOpenList(true)} className='w-[250px] rounded-lg'>+ Add List</button>}
          {openList && (
            <div>
              <input type='text' placeholder='Enter List Title' className='w-full p-1 mb-2 border border-gray-300 rounded-lg' value={listTitle} onChange={(e)=>setListTitle(e.target.value)}/>
              <button onClick={handleAddList} className='w-full p-2 bg-blue-600 text-white rounded-lg'>Add List</button>
            </div>
          )}
        </div>
      </div>
      {open && <OverlayModel
          setOpen={setOpen}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          assignTo={assignTo}
          setAssignTo={setAssignTo}
          dispatch={dispatch}
          addTask={addTask}
        />}
    </div>
  )
}

export default TaskManager