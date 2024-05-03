import Link from "next/link"
import logoImg from "/public/images/logo.png"
import classes from "./main-header.module.css"
import Image from "next/image"
import MainHeaderBackground from "./main-header-background"
import NavLink from "./nav-link"

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="NextLevel Food Logo" priority />
        </Link>
        <h1>NextLevel Food</h1>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
