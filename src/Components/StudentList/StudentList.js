import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setStudents,
  addStudent,
  updateStudent,
  setLoading,
  setError,
} from '../../slices/studentSlice';
import { isAuthentiction } from "../../Services/isAuthentiction";
import {useNavigate} from 'react-router-dom'

import { fetchStudentsAPI} from '../../Api';
import './StudentList.css'

const StudentList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.students);
  const [data,setData]=useState([])
    const Navigate=useNavigate()
 

  useEffect(() => {
    dispatch(setLoading(true));
    fetchStudentsAPI()
      .then((data) => {dispatch(setStudents(data))
        setData(data)
       
      })
      .catch((err) => dispatch(setError(err.message)))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  
  
  const handleFilter=(e)=>{
           let value=e.target.value.trim()
           if(value.trim()===''){
            setData(list)
           }
           else{
           let data=list.filter((val)=> val.course==value)
           console.log(data)
           setData(data)}
  }
const   handleSearch=(e)=>{
  let value=e.target.value.toLowerCase()
   if(value.trim()===''){
            setData(list)
           }
           else{
           let data=list.filter((val)=> val.name.toLowerCase().startsWith(value))
           console.log(data)
           setData(data)}
}
  console.log(isAuthentiction())
  
  if(!isAuthentiction()){
       Navigate('/signin/Home')
    }

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error: {error}</p>;
   
  return (
    <div className="student-list">
      <div className='feature'>
      <h2>Student List</h2>
      <select className='filters' onChange={handleFilter}>
    <option value="">Filter by</option>
     {[...new Set(list.map((student) => student.course))].map((course) => (
    <option key={course} value={course}>
      {course}
    </option>
  ))}
</select>
      <input type='text' placeholder='Enter name' onChange={handleSearch} />
      </div>
     
      <div>
      <div>
        
      </div>
      <table className="student-table"  cellPadding="4" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Roll.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
           
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr  key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
              
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default StudentList;
