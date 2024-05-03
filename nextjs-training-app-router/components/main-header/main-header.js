import Link from "next/link"
import logoImg from "/public/images/logo.png"
import classes from "./main-header.module.css"
import Image from "next/image"
import MainHeaderBackground from "./main-header-background"

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
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/meals">Browse Meals</Link>
            </li>
            <li>
              <Link href="/community">Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
