import { useState } from 'react'
import Header from './Components/Header'
import TaskManager from './Components/TaskManager'
import DynamicForm from './Components/DynamicForm'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col h-screen bg-gradient-to-t from-sky-500 to-indigo-500">
      {/* -----------------------------------------------
          🗂️ Project 1: Trello-like Task Manager
          Components: Header, TaskManager
          Uncomment below lines to run this project
      ------------------------------------------------ */}
      {/* <Header />
      <TaskManager /> */}

      {/* -----------------------------------------------
          📋 Project 2: Dynamic Form Builder
          Component: DynamicForm
          Active project for testing
      ------------------------------------------------ */}
      <DynamicForm />
    </div>
  )
}

export default App