import React from 'react';
import InstanceList from './components/InstanceList';
import InstanceForm from './components/InstanceForm';
import CourseList from './components/CourseList';
import './index.css';

function App() {

  const handleInstanceCreated = () => {
    console.log('Instance created successfully');
  };

  return (
    <div className="App"  style={{ display: 'grid', gap: '20px' }}>
      <div>
        <h1>COURSES</h1>  
      </div>
      <InstanceForm onInstanceCreated={handleInstanceCreated} />
      <CourseList />
      <hr />
      <InstanceList />
    </div>
  );
}

export default App;
