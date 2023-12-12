export default function AccordionItem({
  isOpen,
  num,
  title,
  onClick,
  children
}) {
  return (
    <div className={isOpen ? "item open" : "item"} onClick={onClick}>
      <p className="number">{num < 9 ? `0${num}` : num}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  )
}
