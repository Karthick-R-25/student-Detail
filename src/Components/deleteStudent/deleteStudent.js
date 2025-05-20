import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setStudents,
  deleteStudent,
  setLoading,
  setError,
} from '../../slices/studentSlice';
import { fetchStudentsAPI, deleteStudentAPI } from '../../Api';


const DeleteStudentPage = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchStudentsAPI()
      .then((data) => dispatch(setStudents(data)))
      .catch((err) => dispatch(setError(err.message)))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(setLoading(true));
      deleteStudentAPI(id)
        .then(() => dispatch(deleteStudent(id)))
        .catch((err) => dispatch(setError(err.message)))
        .finally(() => dispatch(setLoading(false)));
    }
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="student-list">
      <h2>Delete Student</h2>
      
      
      <table className="student-table" cellPadding="4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteStudentPage;
