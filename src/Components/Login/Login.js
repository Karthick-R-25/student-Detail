import React,{useState,useEffect, useRef} from "react";
import { Login } from "../../Api";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import './Login.css'

function Signin(){
    const[message,setMessage]=useState([])
    const[LogError,setLogError]=useState()
    const mailRef=useRef()
    const passwordRef=useRef()
    const[signed,setSigned]=useState('Login')
    const Navigate=useNavigate()
    const{ action }=useParams()
   const handleSignIn=async(e)=>{
         e.preventDefault()
         setLogError('')
         let mail=mailRef.current.value
         let password=passwordRef.current.value
         let data={
            email:mail,
            password
         }
        
        let response=await Login(data) 
      
        if(!response.error){
             
            setMessage(response)
            Navigate(`/${action}`)
            console.log(message)
        }
        else{
              let data= response.error.toLowerCase()
             .replace(/_/g, ' ')
    .replace(/^\w/, c => c.toUpperCase());
            setLogError(data)
            console.log(LogError)
        }
   }
   
    return(
         <div className="adder">
            <form onSubmit={handleSignIn}>
            <input placeholder="Enter your Email"  type="mail"  ref={mailRef} />
            <input placeholder="Enter your password"ref={passwordRef} />
             {LogError?
            <span style={{color:"red",marginTop:"-2rem"}}>{LogError}</span>:null}
            <button type="submit">{signed=="signup"?"Signup":"Signin"}</button>
            <div>
            <p>new user</p>
            <p onClick={()=>{Navigate('/signup')}} className="account">Create Account</p></div>
           
            </form>
        </div>
    )




}

export default Signin