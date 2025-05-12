import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setStudents,
  addStudent,
  updateStudent,
  setLoading,
  setError,
} from '../../slices/studentSlice';
import { fetchStudentsAPI, addStudentAPI, updateStudentAPI } from '../../Api';
import './StudentList.css'

const StudentList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.students);
  const [formData, setFormData] = useState({ name: '', email: '', course: '', id: null });

  useEffect(() => {
    dispatch(setLoading(true));
    fetchStudentsAPI()
      .then((data) => dispatch(setStudents(data)))
      .catch((err) => dispatch(setError(err.message)))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const action = formData.id ? updateStudentAPI : addStudentAPI;

    action(formData)
      .then((res) => {
        dispatch(formData.id ? updateStudent(res) : addStudent(res));
        setFormData({ name: '', email: '', course: '', id: null });
      })
      .catch((err) => dispatch(setError(err.message)))
      .finally(() => dispatch(setLoading(false)));
  };

  const handleEdit = (student) => setFormData(student);

  const handleDelete = (id) => {
    dispatch(setStudents(list.filter((s) => s.id !== id))); // client-side delete
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="student-list">
      <h2>Student List</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Course"
          value={formData.course}
          required
          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
        />
        <button type="submit">{formData.id ? 'Update' : 'Add'} Student</button>
      </form>
      <div>
      <div>
        
      </div>
      <table className="student-table" border="1" cellPadding="1" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>{' '}
                <button onClick={() => handleDelete(student.id)}>Delete</button>
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
