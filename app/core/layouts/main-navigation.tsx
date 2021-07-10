import { useSession, Link, Routes } from "blitz"
import { useState } from "react"
import styles from "app/core/layouts/main-navigation.module.css"
import NavItem from "./NavItem"

const MainNavigation = () => {
  const session = useSession()
  const [isOpen, setIsOpen] = useState(false)

  // const toggle = () => setIsOpen(!isOpen);
  // @ts-ignore
  return (
    <>
      <div className="flex md:flex-col flex-row">
        {/*<nav className={`flex md:flex-row flex-col ${styles.nav}`}>*/}
        <nav className={"flex flex-wrap items-center justify-between p-5"}>
          <div className="flex md:hidden">
            <button className="toggle hamburger">
              <img className="block" src={"/hamburger.svg"} width={40} height={40} alt={"Menu"} />
              <img
                className="toggle hidden"
                src={"/arrow-up.svg"}
                width={40}
                height={40}
                alt={"Collapse Menu"}
              />
            </button>
          </div>
          <div className="toggle hidden md:flex w-full md:w-auto text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none">
            <ul className={"flex md:flex-row flex-col gap-4"}>
              <NavItem href={"/"}>Home</NavItem>
              <NavItem href={"/about"}>About Us</NavItem>
              <NavItem href={"/private-clients"}>Private Clients</NavItem>
              {session.userId !== null ? (
                <NavItem href={"/forum"}>Forum</NavItem>
              ) : (
                <NavItem href={"/login"}>Members Area</NavItem>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  )
}

export default MainNavigation
