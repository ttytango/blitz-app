import { Link, Router, Routes, Ctx } from "blitz"
import React, { useState } from "react"
// onClick={activeHandler}
export default function NavItem({ href, children }) {
  return (
    <li>
      <Link href={href}>
        <a
          className={
            "block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none no-underline hover:underline"
          }
        >
          {children}
        </a>
      </Link>
    </li>
  )
}
