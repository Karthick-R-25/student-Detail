import logo from './logo.svg';
import './App.css';
import StudentList from './Components/StudentList/StudentList';
import AddStudent from './Components/Dashboard/Addstudent';
import {BrowserRouter,Routes,Route,Link, useNavigate} from 'react-router-dom';
import Updated from './Components/Updatestudent/updateStudent';
import EditStudentForm from './Components/Updatestudent/updateForm';
import DeleteStudentPage from './Components/deleteStudent/deleteStudent';
import Signup from './Components/signup/signup';
import Signin from './Components/Login/Login';
import { isAuthentiction } from "./Services/isAuthentiction";
import Logout from './Services/isAuthentiction';


function App() {
  const navigated=useNavigate()
  return (
    <div className="App">
      <div className='container'>
        <div className='Dashboard'>
          <h4 className='home' onClick={()=>{isAuthentiction()?navigated('/Home'):navigated('/signin/Home')}}>Home</h4>

          <ul >
            <li onClick={()=>{isAuthentiction()?navigated('/AddStudent'):navigated('/signin/AddStudent')}}>Add Student</li>
             <li onClick={()=>{isAuthentiction()?navigated('/updated'):navigated('/signin/updated')}}>Update Student</li>
             <li onClick={()=>{isAuthentiction()?navigated('/Delete'):navigated('/signin/Delete')}}>Delete Student</li>
              <li onClick={()=>navigated('/logout')} style={{color:"red",fontSize:"15px",fontWeight:"bold"}}>Logout</li>

          </ul>
        </div>
      <div className='components'>
     
      <Routes>
     <Route path='/' element={<StudentList/>}  />
        
     <Route path='/Home'  element={isAuthentiction()?<StudentList />:<Signin/>}/>

      <Route path='/AddStudent'  element={isAuthentiction()?<AddStudent />:<Signin />}/>
       <Route path='/signup'  element={<Signup />}/>
         <Route path='/signin/:action'  element={<Signin />}/>
      <Route path='/updated'  element={<Updated />}/>
       <Route path="/edit/:id" element={<EditStudentForm />} />
        <Route path="/Delete" element={<DeleteStudentPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      
      </div>
      </div>
    </div>
  );
}

export default App;
