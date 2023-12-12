import React from "react"
import "./Avatar.css"

function Avatar() {
  const avatarSrc = "https://avatars.githubusercontent.com/u/170621?v=4"

  return <img className="avatar" src={avatarSrc} alt="Chris Kälin" />
}

export default Avatar
