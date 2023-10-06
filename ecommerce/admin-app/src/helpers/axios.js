import axios from 'axios';
import { api } from '../urlConfig';

// Get the token from localStorage
const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    // Check if the token exists and is not expired
    ...(token && isTokenValid(token) && { authorization: `Bearer ${token}` }),
  },
});

// Function to check if the token is valid
function isTokenValid(token) {
  try {
    // Decode the JWT token and check its expiration
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp > currentTime;
  } catch (error) {
    // Handle token decoding errors here
    console.error('Error decoding token:', error);
    return false;
  }
}

export default axiosInstance;
