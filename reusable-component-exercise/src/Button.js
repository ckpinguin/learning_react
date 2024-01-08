export default function Button({children, mode = "filled", Icon, ...props}) {
  // Todo: Build this component!

  // !!! Important:
  // Wrap the icon with a <span className="button-icon"> to achieve the target look
  // Also wrap the children prop with a <span>
  const icon = Icon ? (
    <span className="button-icon">
      <Icon />
    </span>
  ) : (
    ""
  )
  return (
    <button {...props} className={`button ${mode}-button`}>
      {icon}
      <span>{children}</span>
    </button>
  )
}
