import { Link } from "react-router-dom"

export default function Button({ children, disabled, to, type }) {
  const base =
    "rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
  const styles = {
    primary: base + "px-4 py-3 md:px-6 md:py-4",
    secondary:
      base +
      "bg-stone-400 hover:bg-stone-300 focus:bg-stone-300 text-yellow-400",
    small: base + "px-4 py-2 md:px-5 md:py-2.5 text-xs",
  }

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    )
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  )
}
