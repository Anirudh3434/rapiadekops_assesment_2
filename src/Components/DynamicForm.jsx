import React, { useState } from "react";
import DynamicOverlay from "./DynamicOveray";

function DynamicForm() {
  const [FormInput, setFormInput] = useState([]);
  const [open, setOpen] = useState(false);
  const [Label, setLabel] = useState("");
  const [placeHolder, setPlaceHolder] = useState("");
  const [type, setType] = useState("");

  const handleAddInput = (Label, type, placeHolder) => {
    const newInput = {
      id: Date.now(),
      type,
      placeHolder,
      value: "",
    };
    setFormInput((prev) => [...prev, newInput]);
  };

  const handleRemoveInput = (id) => {
    setFormInput((prev) => prev.filter((input) => input.id !== id));
  };


  return (
    <div className="flex items-center justify-center flex-col gap-4 p-4">
     {
        FormInput.length < 1 ? <div className="w-[500px]flex items-center justify-center bg-white rounded-2xl p-4 text-2xl font-bold"> Add Input Field Yet</div>
         : <div className="w-[500px] flex-col gap-1 flex items-center justify-center bg-white rounded-2xl p-4 text-2xl font-bold"> {FormInput.map((input) => (
          <div key={input.id} className="flex flex-col gap-2  p-3 rounded-md">
          <label className="font-medium">{input.Label}</label>
          <input
            type={input.type}
            placeholder={input.placeHolder}
            value={input.value}
            className="border px-3 py-2 rounded-md focus:ring focus:ring-blue-300 outline-none"
          />
          <button
            onClick={() => handleRemoveInput(input.id)}
            className="text-red-500 text-sm hover:underline self-start"
          >
            Remove
          </button>
        </div>
        ))}</div>
     }

      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-fit"
      >
        Add Input
      </button>

      {open && (
        <DynamicOverlay
          setOpen={setOpen}
          FormInput={FormInput}
          setFormInput={setFormInput}
          Label={Label}
          setLabel={setLabel}
          placeHolder={placeHolder}
          setPlaceHolder={setPlaceHolder}
          type={type}
          setType={setType}
        />
      )}
    </div>
  );
}

export default DynamicForm;