import PropTypes from "prop-types"
import React, { useState } from "react"

TextExpander.propTypes = {
  collapsedNumWords: PropTypes.number,
  expandButtonText: PropTypes.string,
  collapseButtonText: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonInline: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default function TextExpander({
  collapsedNumWords = 10,
  expandButtonText = "Show text",
  collapseButtonText = "Collapse text",
  buttonColor = "#1f09cd",
  buttonInline = true,
  className = "",
  expanded = false,
  children = null,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded)

  const words = children.split(" ")
  const isCollapsible = words.length > collapsedNumWords
  const partWords = isCollapsible
    ? words.slice(0, collapsedNumWords).join(" ") + "..."
    : children

  const displayText = isExpanded ? children : partWords
  const buttonStyle = {
    background: "none",
    display: buttonInline ? "inline" : "block",
    color: buttonColor,
    border: "none",
    font: "inherit",
    marginLeft: "6px",
    cursor: "pointer",
  }
  return (
    <div className={className}>
      {displayText}
      <Button
        style={buttonStyle}
        onClick={() => setIsExpanded(!isExpanded)}
        text={isExpanded ? collapseButtonText : expandButtonText}
      />
    </div>
  )
}

function Button({ onClick, color, text, style }) {
  return (
    <button style={style} color={color} onClick={onClick}>
      {text}
    </button>
  )
}
