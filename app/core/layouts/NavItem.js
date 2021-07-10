import { Link, Router, Routes, Ctx } from "blitz"
import React, { useState } from "react"

export default function NavItem({ href, children}) {

  return (
    <li>
      <Link href={href}>
        <a
          className={
            "block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none no-underline hover:underline"
          }
          /* className={`block px-4 py-2 rounded-md ${isActive ? "bg-blue-100 text-blue-700" : ""}`}*/
          // onClick={activeHandler}
        >
          {children}
        </a>
      </Link>
    </li>
  )
}
