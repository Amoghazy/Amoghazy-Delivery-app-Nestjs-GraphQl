import { useQuery } from "@apollo/client"
import GET_USER from "../graphql/actions/getuser.action"

const useUser = () => {
const {data,loading}=useQuery(GET_USER)

return{
    user:data?.getLoginUser?.user,loading
}



}
export default useUser