import { useQuery } from "blitz"
import getUsers from "app/users/queries/getUsers"

export const useUsers = () => {
  const [users] = useQuery(
    getUsers
    //    {
    //       where: { id: 1 }}
  )
  return users
}
