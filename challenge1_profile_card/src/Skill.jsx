import React from "react"
import "./Skill.css"

function Skill({ skill, url, color, level, emoji }) {
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <span>{emoji} </span>
        <span>{skill} </span>
        <span>
          {level === "advanced" && "💪"}
          {level === "medium" && "👍"}
          {level === "beginner" && "🦤"}
        </span>
      </a>
    </div>
  )
}
export default Skill
