import React,{useState,useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { Register } from "../../Api";
import '../Dashboard/Addstudent.css'
import { setError } from "../../slices/studentSlice";

 

function Signup(){
    const[signed,setSigned]=useState('signup')
    const emailRef=useRef()
    const passwordRef=useRef()
    const[message,setMessage]=useState('')
    const[imperror,setImpError]=useState('')
    const Navigate=useNavigate()
   const handleSignup=async(e)=>{
          e.preventDefault()
          let email=emailRef.current.value
          let password=passwordRef.current.value
          let data={
            email,
            password
          }
          setImpError('')
       
         let response=await Register(data)
         if(response.error){
           let data= response.error.toLowerCase()
    .replace(/_/g, ' ')
    .replace(/^\w/, c => c.toUpperCase());
           setImpError(data)
           Navigate("/student-Detail")
           console.log(imperror)
         }
         else{
            setMessage(response.data)
            
            console.log(message)
         }
    
    
        
    }
   
    return(
        <div className="adder">
            <form onSubmit={handleSignup}>
            <input placeholder="Enter your Email" ref={emailRef} />
            <input placeholder="Enter your password" type="mail" ref={passwordRef} />
             {imperror?
            <span style={{color:"red",marginTop:"-2rem"}}>{imperror}</span>:null}
            <button type="submit">{signed=="signup"?"Signup":"Signin"}</button>
           
            </form>
        </div>
    )
}
export default Signup
