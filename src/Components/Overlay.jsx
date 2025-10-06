import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, dragTask, addList } from "../Redux/taskSlice";
import { PlusCircle, X, Trash2 } from "lucide-react";

// ✅ Moved OverlayModel OUTSIDE main component
function OverlayModel({ setOpen, title, setTitle, description, setDescription, assignTo, setAssignTo, dispatch, addTask }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(
      addTask({
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        assignTo: assignTo || "Unassigned",
      })
    );

    // reset form fields
    setOpen(false);
    setTitle("");
    setDescription("");
    setAssignTo("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              type="text"
              value={title}
              placeholder="Task title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              value={description}
              placeholder="Task description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Assign to */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign to</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              required
            >
              <option value="" disabled>Select a person</option>
              {["Anirudh", "Aryan", "Aman", "Lavish"].map((person) => (
                <option key={person} value={person}>{person}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <PlusCircle size={18} />
            <span>Add Task</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default OverlayModel
