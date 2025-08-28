export default function AsideBar({ addProject, projects, handleProjectSelect }) {
  return (
    <aside className="flex flex-col w-1/4 bg-stone-900 text-white mt-10 rounded-tr-lg h-screen pt-[60px] px-10">
      <h1 className="my-8 text-start text-[25px] font-bold text-white uppercase inline">Your Projects</h1>
      <button
        onClick={addProject}
        className="w-40 py-3 px-2 bg-stone-700 text-stone-300 rounded-md tracking-wide text-[18px] hover:text-white hover:bg-stone-600"
      >
        + Add Project
      </button>
      <hr className="m-5 w-0" />
      {projects.length > 0 && (
        <ul>
          {projects.map((project, index) => {
            return (
              <li key={project.title + index} className="flex">
                <button
                  id={project.id}
                  onClick={handleProjectSelect}
                  className="m-1 py-2 px-3 w-[100%] hover:bg-stone-800 text-start text-[18px] rounded"
                >
                  {project.title}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
