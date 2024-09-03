import React, { useState, useEffect } from 'react';
import { getCourses, deleteCourse } from './api';
import CourseForm from './CourseForm'; 

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      console.log('API Response:', response); 
      setCourses(response);
    } catch (error) {
      console.error('Error while fetching courses:', error);
    }
  };

  const handleDelete = async (courseCode) => {
    console.log('Attempting to delete course with code:', courseCode);
    if (!courseCode) {
      console.error('Invalid course code:', courseCode);
      return;
    }
    try {
      await deleteCourse(courseCode);
      setCourses(prevCourses => 
        prevCourses.filter(course => course.courseCode !== courseCode)
      );
      console.log('Deletion successful');
    } catch (error) {
      console.error('Error occured while deleting course:', error);
    }
  };

  return (
    <div>
      <CourseForm onCourseCreated={fetchCourses} />
      <hr/>
      <h3>List Courses</h3>
      
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.courseCode}>
                <td>{course.courseCode}</td>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>
                  <button onClick={() => handleDelete(course.courseCode)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No courses available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
