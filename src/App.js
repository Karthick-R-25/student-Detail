import logo from './logo.svg';
import './App.css';
import StudentList from './Components/StudentList/StudentList';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='Dashboard'>
          <h4>Dashboard</h4>
          <ul >
            <li>Add Student</li>
             <li>Update Student</li>
             <li>Delete Student</li>
          </ul>
        </div>
      <div className='components'>
      <StudentList />
      </div>
      </div>
    </div>
  );
}

export default App;
