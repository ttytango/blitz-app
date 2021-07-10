import { Suspense, useEffect, useState } from "react"
import {
  BlitzPage,
  Head,
  Link,
  Routes,
  usePaginatedQuery,
  useParam,
  useQuery,
  useRouter,
} from "blitz"

const CommentListItem = (props) => {
  return (
    <>
      <li>
        <p>Comment List Item</p>
      </li>
    </>
  )
}

export default CommentListItem
