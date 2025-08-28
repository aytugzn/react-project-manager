import { useState } from "react";
import Tasks from "./Tasks";

export default function ProjectDetails({
  showProjectDetails,
  handleProjectDelete,
  allTasks,
  setAllTasks,
  handleClear,
}) {
  console.log(showProjectDetails);
  const [inputValue, setInputValue] = useState("");

  function handleTaskAdd() {
    if (!inputValue.trim()) return;
    setAllTasks((prev) => {
      return { ...prev, [showProjectDetails.id]: [...(prev[showProjectDetails.id] || []), inputValue] };
    });
    setInputValue("");
  }

  function handleInputChange(event) {
    const value = event.target.value;
    setInputValue(value);
  }

  return (
    <div className="w-[90%] flex flex-col gap-[10px]">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-bold text-stone-700">{showProjectDetails.title}</h2>
        <button onClick={handleProjectDelete} className="text-[19px] tracking-wide text-stone-700">
          Delete
        </button>
      </div>
      <p className="text-[19px] text-stone-400 mb-1">{showProjectDetails.due_date}</p>
      <p className="whitespace-pre-wrap text-[19px] text-stone-700">{showProjectDetails.description}</p>
      <hr className=" border-stone-300 my-3 " />
      <h3 className="text-2xl font-bold text-stone-700">Tasks</h3>
      <div className="flex gap-[15px] mb-5">
        <input
          onChange={handleInputChange}
          value={inputValue}
          type="text"
          className="w-[16rem] bg-stone-200 rounded-[2px] h-[1.7rem] p-2"
        />
        <button onClick={handleTaskAdd} className="text-[17px]">
          Add Task
        </button>
      </div>

      {!allTasks?.[showProjectDetails.id]?.length && (
        <p className="text-[19px]">This project does not have any tasks yet.</p>
      )}

      {allTasks?.[showProjectDetails.id]?.length > 0 && (
        <Tasks allTasks={allTasks} project={showProjectDetails} handleClear={handleClear} />
      )}
    </div>
  );
}
