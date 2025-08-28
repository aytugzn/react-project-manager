export default function Tasks({ allTasks, handleClear, project }) {
  return (
    <ul className="bg-stone-100 rounded py-6 px-4 flex flex-col gap-6">
      {allTasks[project.id].map((task, index) => {
        return (
          <li key={task.trim().toLowerCase() + index} className="flex justify-between w-full">
            <p className="text-[18px] break-words">{task}</p>
            <button className="text-[18px]" type="submit" onClick={() => handleClear(index)}>
              Clear
            </button>
          </li>
        );
      })}
    </ul>
  );
}
