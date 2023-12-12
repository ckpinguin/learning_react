import React from "react"
import "./SkillList.css"
import Skill from "./Skill"

function SkillList({ skills }) {
  return (
    <div className="skill-list">
      {skills.map(skill => (
        <Skill {...skill} />
      ))}
    </div>
  )
}

export default SkillList
