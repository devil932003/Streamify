import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../lib/api"

 const authUser = () => {
   const authUser = useQuery({
     queryKey: ['authUser'],
     queryFn: getAuthUser,
     retry: false,
   })
   return {isLoading: authUser.isLoading, authUser:authUser.data?.user}
 }

 export default authUser