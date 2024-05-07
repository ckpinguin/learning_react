import { useState } from "react"
import NewProject from "./components/NewProject"
import NoProjectSelected from "./components/NoProjectSelected"
import ProjectsSidebar from "./components/ProjectsSidebar"
import SelectedProject from "./components/SelectedProject"

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined, // undefined = no current action
    projects: [],
  })

  function handleAddTask(text) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.map((project) => {
          if (project.id === prevState.selectedProjectId) {
            project.tasks = project.tasks.concat({ text, id: Math.random() })
          }
          return project
        }),
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.map((project) => {
          if (project.id === prevState.selectedProjectId) {
            project.tasks = project.tasks.filter((task) => task.id !== id)
          }
          return project
        }),
      }
    })
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
        tasks: [],
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      }
    })
  }

  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null, // null = starting new project action,
      }
    })
  }

  function handleCancel() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }

  function handleDeleteProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.filter((project) => project.id !== id),
        selectedProjectId: undefined,
      }
    })
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  )
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />
  )

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancel} />
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  )
}

export default App
