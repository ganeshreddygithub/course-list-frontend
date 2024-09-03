import React , { useState } from 'react' ;
import { createCourse } from './api';
import '../index.css'; 

const CourseForm = ({ onCourseCreated }) => {
  const [courseData, setCourseData] = useState({
    title: '',
    courseCode: '',
    description: '',
  });

  const handleChange  = ( e ) => {
    const { name, value } = e.target;
    setCourseData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit =  async ( e ) => {
    e.preventDefault();
    console.log('Attempting to create course with data:', courseData);
    if ( !courseData.title ||  !courseData.courseCode ||  !courseData.description ) {
      console.error( 'Invalid course data:', courseData );
      return ;
    }
    try {
      await createCourse(courseData);
      console.log('Course created successfully');
      onCourseCreated(); 
      setCourseData({
        title: '',
        courseCode: '',
        description: '',
      });
    } catch (error) {
      console.error('Error creating course:', error );
    }
  };

  return (
    <div className="course-form">
      <h2>create course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            name="title" 
            placeholder="Title" 
            value={courseData.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <input 
            name="courseCode" 
            placeholder="Course Code" 
            value={courseData.courseCode} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <textarea 
            name="description" 
            placeholder="Description" 
            value={courseData.description} 
            onChange={handleChange} 
            required 
          >
            
          </textarea>
        </div>
        <button type="submit"> Create Course </button>
      </form>
    </div>
  );
};

export default CourseForm;
