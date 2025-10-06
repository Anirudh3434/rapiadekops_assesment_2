import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        name: "To-do",
        tasks: [
            { id: 1, title: "Create Frontend", description: "Use React to make the frontend" }
        ]
    },
    {
        name: "In-progress",
        tasks: [
            { id: 2, title: "Create Backend", description: "Use Node.js to make the backend" },
            { id: 3, title: "Connect Database", description: "Use MongoDB for data storage" }
        ]
    },
    {
        name: "Done",
        tasks: [
            { id: 4, title: "Deploy", description: "Deploy the project on GitHub" }
        ]
    }
];

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state[0].tasks.push(action.payload);
        },
        deleteTask: (state, action) => {
            const { column, taskId } = action.payload;
            const columnIndex = state.findIndex(c => c.name === column);
            if (columnIndex !== -1) {
                state[columnIndex].tasks = state[columnIndex].tasks.filter(task => task.id !== taskId);
            }
        },
        dragTask: (state, action) => {
            const { fromColumn, toColumn, task } = action.payload;
            const fromCol = state.find(c => c.name === fromColumn);
            const toCol = state.find(c => c.name === toColumn);
            if (!fromCol || !toCol) return;

          
            fromCol.tasks = fromCol.tasks.filter(t => t.id !== task.id);

            
            toCol.tasks.push({ ...task });
        },

        addList : (state, action) => {
            state.push({ name: action.payload.name, tasks: [] });
        }
    }
});

export const { addTask, deleteTask, dragTask, addList } = taskSlice.actions;
export default taskSlice.reducer;