import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateStudent, setLoading, setError } from '../../slices/studentSlice';
import { updateStudentAPI } from '../../Api';

const EditStudentForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation(); // access passed data
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: state?.name || '',
        email: state?.email || '',
        course: state?.course || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedStudent = { ...formData, id: Number(id) };

        dispatch(setLoading(true));
        updateStudentAPI(updatedStudent)
            .then((res) => {
                dispatch(updateStudent(res));
                navigate('/'); // go back to list
            })
            .catch((err) => dispatch(setError(err.message)))
            .finally(() => dispatch(setLoading(false)));
    };

    return (
        <div className='adder'>
            <h2>Update Here</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={formData.name}
                    placeholder="Name"
                    required
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                    type="email"
                    value={formData.email}
                    placeholder="Email"
                    required
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <select
                    value={formData.course}
                    required
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                >
                    <option value="">Select Course</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Economics">Economics</option>
                </select>

                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditStudentForm;
