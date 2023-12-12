import React from "react"
import Avatar from "./Avatar"
import Intro from "./Intro"
import SkillList from "./SkillList"
import "./App.css"

function App() {
  const skills = [
    {
      name: "React",
      url: "https://reactjs.org/",
      emoji: "⚛️",
      level: "advanced",
      color: "lightblue"
    },
    {
      name: "JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      emoji: "🕸",
      level: "medium",
      color: "yellow"
    },
    {
      name: "HTML",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      emoji: "📄",
      level: "advanced",
      color: "orange"
    },
    {
      name: "CSS",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      emoji: "🎨",
      level: "medium",
      color: "pink"
    },
    {
      name: "Python",
      url: "https://www.python.org/",
      emoji: "🐍",
      level: "medium",
      color: "lightgreen"
    },
    {
      name: "FastAPI",
      url: "https://fastapi.tiangolo.com/",
      emoji: "🚀",
      level: "advanced",
      color: "lightgrey"
    },
    {
      name: "Go",
      url: "https://golang.org/",
      emoji: "🐹",
      level: "beginner",
      color: "grey"
    }
  ]
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList skills={skills} />
      </div>
    </div>
  )
}

export default App
