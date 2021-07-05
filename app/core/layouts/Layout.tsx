import React, { ReactNode, Suspense } from "react"
import { Head } from "blitz"
import MainNavigation from "./main-navigation"
import styles from "./Layout.module.css"
import Footer from "app/core/components/Footer"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "myApp"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainNavigation />
      <Suspense
        fallback={
          <div className="text-center mx-auto text-2xl">
            <h1>Loading...</h1>
          </div>
        }
      >
        <main className={styles.layoutMain}>{children}</main>
      </Suspense>
      <Footer />
    </>
  )
}

export default Layout
