
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
      
export const isAuthentiction=()=>{
    let idTOken=localStorage.getItem('idToken')
    if(idTOken){
        return true
    }
    else{
        return false
    }
}



