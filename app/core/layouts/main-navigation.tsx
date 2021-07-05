import { useSession, Link, Routes } from "blitz"
// import Header from "../../Header"
import styles from "app/core/layouts/main-navigation.module.css"

const MainNavigation = () => {
  const session = useSession()
  console.log(session)
  console.log(session.userId)
  return (
    <>
      <div className="flex md:flex-col flex-row">
        <nav className={`flex md:flex-row flex-col ${styles.nav}`}>
          <ul className={"flex md:flex-row flex-col gap-4"}>
            <li>
              <Link href={"/"}>
                <a className={"no-underline hover:underline"}>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className={"no-underline hover:underline"}>About Us</a>
              </Link>
            </li>
            <li>
              <Link href={"/private-clients"}>
                <a className={"no-underline hover:underline"}>Private Clients</a>
              </Link>
            </li>
            <li>
              <Link href={"/contact-us"}>
                <a className={"no-underline hover:underline"}>Contact Us</a>
              </Link>
            </li>
            {/*
            {!session && (
              <Link href={"/LoginForm"}>
                <a className={"no-underline hover:underline"}>Members Area</a>
              </Link>
            )} */}
            {session.userId !== null ? (
              <li>
                <Link href={"/forum"}>
                  <a className={"no-underline hover:underline"}>Forum</a>
                </Link>
              </li>
            ) : (
              <Link href={"/login"}>
                <a className={"no-underline hover:underline"}>Members Area</a>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default MainNavigation
