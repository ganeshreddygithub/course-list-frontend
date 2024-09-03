import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; 


export const getCourses = () => {
  return axios.get(`${API_BASE_URL}/Course/allCourses`)
    .then(response => response.data)
    .catch(error => {
      console.error(" fetch courses aifled:", error);
      throw error;
    });
};

export const createCourse = (courseData) => {
  return axios.post(`${API_BASE_URL}/Course/addCourse`, courseData)
    .then(response => response.data)
    .catch(error => {
      console.error("course creation failed:", error);
      throw error;
    });
};


export const deleteCourse = (code) => {
  return axios.delete(`${API_BASE_URL}/Course/delete/${code}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to delete course:", error);
      throw error;
    });
};




export const getInstances = (courseYear, sem) => {
  return axios.get(`${API_BASE_URL}/Instance/year/sem/${courseYear}/${sem}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Failed to fetch instances:', error);
      throw error;
    });
};


export const createInstance = (instanceData) => {
  return axios.post(`${API_BASE_URL}/Instance/addInstance`, instanceData)
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to create instance:", error.response ? error.response.data : error.message);
      throw error;
    });
};


export const deleteInstance = (courseId) => {
  return axios.delete(`${API_BASE_URL}/Instance/delete/${courseId}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to delete instance:", error);
      throw error;
    });
};
