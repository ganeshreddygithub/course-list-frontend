import React, { useState } from 'react';
import { createInstance } from './api';
import '../index.css'; 

const InstanceForm = ({ onInstanceCreated }) => {
  const [instanceData, setInstanceData] = useState({
    courseYear: '',
    sem: '',
    courseId: '',
  });

  const handleChange =  ( e ) => {
    setInstanceData({ ...instanceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Attempting to create instance with data:', instanceData);
    if (!instanceData.courseYear  || !instanceData.sem ||  !instanceData.courseId) {
      console.error('Instance data invalid:', instanceData);
      return ;
    }
    try {
      await createInstance(instanceData);
      console.log('successfully instance created');
      
     
      if (typeof onInstanceCreated === 'function') {
        onInstanceCreated(); 
      }
    } catch (error) {
      console.error( 'creating instance error:', error );
    }
  };

  return (
    <div className="instance-form">
      
      <h2>create instance</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <input 
          name="courseYear" 
          placeholder="course year" 
          value={instanceData.year} 
          onChange={handleChange} 
          required 
        />
        </div>
        <div>
        <input 
          name="sem" 
          placeholder="Semester" 
          value={instanceData.sem} 
          onChange={handleChange} 
          required 
        />
        </div>
        <div>
        <input 
          name="courseId" 
          placeholder="Course code" 
          value={instanceData.courseId} 
          onChange={handleChange} 
          required 
        />         
        </div>
        <button type="submit">Create Instance</button>
      </form>
    </div>
  );
};

export default InstanceForm;
