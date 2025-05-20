import axios from "axios";


 const axiosClient=axios.create({
    baseURL:'https://identitytoolkit.googleapis.com/v1/',
    headers:{
        "Content-Type":"appliction/json"
    },
 })

 export default axiosClient