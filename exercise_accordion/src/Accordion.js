import { faqs } from "./App"
import AccordionItem from "./AccordionItem"
import { useState } from "react"

export default function Accordion() {
  const [currentOpen, setCurrentIsOpen] = useState(0)
  function handleOpen(index) {
    if (currentOpen === index) {
      setCurrentIsOpen(null)
    } else {
      setCurrentIsOpen(index)
    }
  }

  return faqs.map((item, index) => (
    <AccordionItem
      isOpen={currentOpen === index}
      onClick={() => handleOpen(index)}
      key={item.title} // better than index
      num={index + 1}
      title={item.title}
    >
      {item.text}
    </AccordionItem>
  ))
}
