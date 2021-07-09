import { Link, Router, Routes, Ctx } from "blitz"
import React, { useState } from "react"

// class NavItem extends React.Component {
//   constructor(props) {
//     super(props);
//       this.Ctx = this.props.Ctx
//       this.children = this.props.children
//       this.href = this.props.href;
//       this.isActive =this.props.isActive;
//
//   }
//
//   render() {
//     // window.location.href
//
//     return (
//       <li>
//         <Link href={this.href}>
//           <a isActive={className}
//             className={`block px-4 py-2 rounded-md ${this.isActive ? 'bg-blue-100 text-blue-700' : ''}`}
//           {...this.props}>
//             {this.children}
//           </a>
//         </Link>
//       </li>
//     )
//   }
//
// }
// export default NavItem
export default function NavItem({ href, /*isActive, */ children, activeHandler }) {
  // const [isActive, setIsActive] = useState(false)

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
