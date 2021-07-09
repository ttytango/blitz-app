import { useSession, Link, Routes } from "blitz"
import { useState } from "react"
import styles from "app/core/layouts/main-navigation.module.css"
import NavItem from "./NavItem"

const MainNavigation = () => {
  const session = useSession()

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
          </ul>
        </nav>
      </div>
    </>
  )
}

export default MainNavigation
