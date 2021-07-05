import { useSession, Link, Routes } from "blitz"
import { useState } from "react"
// import Header from "../../Header"
import styles from "app/core/layouts/main-navigation.module.css"
import NavItem from "./NavItem"

const MainNavigation = () => {
  const session = useSession()
  //
  // console.log(session)
  // console.log(session.userId)
  const [isActive, setIsActive] = useState(Boolean)
  const activeHandler = (event) => {
    event.preventDefault()
    if (isActive) {
      setIsActive(false)
      console.log("set to false")
    } else {
      setIsActive(true)
      console.log("set to true")
    }
  }

  // @ts-ignore
  return (
    <>
      <div className="flex md:flex-col flex-row">
        <nav className={`flex md:flex-row flex-col ${styles.nav}`}>
          <ul className={"flex md:flex-row flex-col gap-4"}>
            <NavItem href={"/"}>Home</NavItem>
            <NavItem href={"/about"}>About Us</NavItem>
            <NavItem href={"/private-clients"}>Private Clients</NavItem>
            {session.userId !== null ? (
              <NavItem href={"/forum"}>Forum</NavItem>
            ) : (
              <NavItem href={"/login"}>Members Area</NavItem>
            )}

            {/*<Link href={"/about"}>*/}
            {/*  <a className={"no-underline hover:underline"}>About Us</a>*/}
            {/*</Link>*/}

            {/*<li>*/}
            {/*  <Link href={"/private-clients"}>*/}
            {/*    <a className={"no-underline hover:underline"}>Private Clients</a>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <Link href={"/contact-us"}>*/}
            {/*    <a className={"no-underline hover:underline"}>Contact Us</a>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*/!**/}
            {/*{!session && (*/}
            {/*  <Link href={"/LoginForm"}>*/}
            {/*    <a className={"no-underline hover:underline"}>Members Area</a>*/}
            {/*  </Link>*/}
            {/*)} *!/*/}
            {/*{session.userId !== null ? (*/}
            {/*  <li>*/}
            {/*    <Link href={"/forum"}>*/}
            {/*      <a className={"no-underline hover:underline"}>Forum</a>*/}
            {/*    </Link>*/}
            {/*  </li>*/}
            {/*) : (*/}
            {/*  <Link href={"/login"}>*/}
            {/*    <a className={"no-underline hover:underline"}>Members Area</a>*/}
            {/*  </Link>*/}
            {/*)}*/}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default MainNavigation
