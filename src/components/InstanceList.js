import React, { useState } from 'react';
import { getInstances, deleteInstance } from './api';
import '../index.css';

const InstanceList = () => {
  const [instances, setInstances] = useState([]);
  const [courseYear, setYear] = useState('');
  const [sem, setSemester] = useState('');

  const fetchInstances = async () => {
    try {
      const data = await getInstances(courseYear, sem); 
      console.log('Instances fetched:', data);

      
      if (Array.isArray(data)) {
        setInstances(data);
      } else {
        setInstances([]); 
      }
    } catch (error) {
      console.error('Error in fetching instances:', error);
      setInstances([]); 
    }
  };

  const handleDelete = async (courseId) => {
    console.log('Attempting to delete course with ID:', courseId);
    if (!courseId) {
      console.error('Given courseId is Invalid:', courseId);
      return;
    }
    try {
      await deleteInstance(courseId);
      setInstances(prevInstances => 
        prevInstances.filter(instance => instance.courseId !== courseId)
      );
      console.log('Deletion successful');
    } catch (error) {
      console.error('Error while deleting course instance:', error);
    }
  };

  return (
    <div>
      <h3>List Instances</h3>
      <input
        value={courseYear}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Year"
      />
      <input
        value={sem}
        onChange={(e) => setSemester(e.target.value)}
        placeholder="Semester"
      />
      <button onClick={fetchInstances}>Fetch Instances</button>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Year</th>
              <th>Semester</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {instances.length > 0 ? (
              instances.map((instance) => (
                <tr key={instance.courseId}>
                  <td>{instance.courseId}</td>
                  <td>{instance.courseYear}</td>
                  <td>{instance.sem}</td>
                  <td>
                    <button onClick={() => handleDelete(instance.courseId)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No instances found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstanceList;
