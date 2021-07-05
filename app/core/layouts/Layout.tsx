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

      <main className={styles.layoutMain}>
        <Suspense
          fallback={
            <div className="bg-blue-200 p-12 w-5/12 mx-auto rounded-2xl border-2 border-black">
              <h1 className="text-2xl text-center">Loading...</h1>
              <button type="button" className="bg-rose-600 p-8" disabled>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
                Processing
              </button>
            </div>
          }
        >
          {children}
        </Suspense>
      </main>

      <Footer />
    </>
  )
}

export default Layout
