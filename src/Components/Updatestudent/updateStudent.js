import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStudents, setLoading, setError } from '../../slices/studentSlice';
import { fetchStudentsAPI } from '../../Api';
import { useNavigate } from 'react-router-dom';
import './updateStudent.css'

const Updated = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchStudentsAPI()
      .then((data) => dispatch(setStudents(data)))
      .catch((err) => dispatch(setError(err.message)))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  const handleEditClick = (student) => {
    navigate(`/edit/${student.id}`, { state: student }); // Pass data via location state
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='student-list'>
      <h2>Edit Student Information</h2>
      <table className='student-table ' border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Course</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <button onClick={() => handleEditClick(student)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Updated;
