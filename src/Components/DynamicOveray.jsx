import React from "react";
import { X, PlusCircle } from "lucide-react";

function DynamicOverlay({
  setOpen,
  FormInput,
  setFormInput,
  Label,
  setLabel,
  placeHolder,
  setPlaceHolder,
  type,
  setType,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Label || !type) return;

    const newInput = {
      id: Date.now(), 
      Label,
      placeHolder,
      type,
      value: "",
    };

    setFormInput([...FormInput, newInput]);
    setLabel("");
    setPlaceHolder("");
    setType("");
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Input</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Label
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              type="text"
              value={Label}
              placeholder="Label"
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placeholder
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              type="text"
              value={placeHolder}
              placeholder="Enter placeholder"
              onChange={(e) => setPlaceHolder(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select type
              </option>
              {["text", "number", "email", "password"].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <PlusCircle size={18} />
            <span>Add Input</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default DynamicOverlay;