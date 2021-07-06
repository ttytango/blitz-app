import { Link, Router, Routes, Ctx } from "blitz"
import React, { useState } from "react"

export default function NavItem({ href, /*isActive, */ children, activeHandler }) {
  return (
    <li>
      <Link href={href}>
        <a
          className={"no-underline hover:underline"}
          /* className={`block px-4 py-2 rounded-md ${isActive ? "bg-blue-100 text-blue-700" : ""}`}*/
          // onClick={activeHandler}
        >
          {children}
        </a>
      </Link>
    </li>
  )
}
