import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent, setError, setLoading } from '../../slices/studentSlice';
import { useNavigate } from 'react-router-dom';
import { addStudentAPI } from '../../Api';
import './Addstudent.css'

function AddStudent() {
  const nameRef = useRef();
  const emailRef = useRef();
  const courseRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const course = courseRef.current.value.trim();

    if (!name || !email || !course) {
      alert('All fields are required');
      return;
    }

    const newStudent = { name, email, course };

    dispatch(setLoading(true));
    try {
      const response = await addStudentAPI(newStudent);
      dispatch(addStudent(response));
      navigate('/'); // redirect after adding
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="adder" style={{ padding: '1rem' }}>
      <h3>Add Student</h3>
      <form onSubmit={handleSubmit} >
        <input type="text" ref={nameRef} placeholder="Enter the student Name" required />
        <input type="email" ref={emailRef} placeholder="Enter the student Email" required />
        <select ref={courseRef} required>
          <option value="">Select Course</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="Economics">Economics</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddStudent;
