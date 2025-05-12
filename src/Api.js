// Key to use in LocalStorage
const STORAGE_KEY = 'studentData';

// Load students from LocalStorage or fallback to initial data
let students = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { id: 1, name: "Aarav Sharma", email: "aarav.sharma@example.com", course: "Computer Science" },
  { id: 2, name: "Diya Mehra", email: "diya.mehra@example.com", course: "Electronics" },
  { id: 3, name: "Rohan Patel", email: "rohan.patel@example.com", course: "Mechanical" },
  { id: 4, name: "Ishita Nair", email: "ishita.nair@example.com", course: "Civil" },
  { id: 5, name: "Krishna Verma", email: "krishna.verma@example.com", course: "Biotech" },
];

// Save to LocalStorage
const saveToStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
};

// Simulate API fetch
export const fetchStudentsAPI = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...students]);
    }, 500);
  });
};

// Add a student
export const addStudentAPI = (student) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newStudent = { ...student, id: Date.now() };
      students.push(newStudent);
      saveToStorage();
      resolve(newStudent);
    }, 500);
  });
};

// Update a student
export const updateStudentAPI = (updated) => {
  return new Promise(resolve => {
    setTimeout(() => {
      students = students.map(s => s.id === updated.id ? { ...s, ...updated } : s);
      saveToStorage();
      resolve(updated);
    }, 500);
  });
};

// Delete a student
export const deleteStudentAPI = (id) => {
  return new Promise(resolve => {
    setTimeout(() => {
      students = students.filter(s => s.id !== id);
      saveToStorage();
      resolve(id);
    }, 500);
  });
};
