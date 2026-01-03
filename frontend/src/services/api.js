import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const addContact = async (contactData) => {
  try {
    const response = await axios.post(`${BASE_URL}/contacts`, contactData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
      throw new Error('Server unavailable. Please try again later.');
    } else {
      throw new Error('An error occurred. Please try again.');
    }
  }
};

export const getContacts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/contacts`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
      throw new Error('Unable to load contacts. Please check if server is running.');
    } else {
      throw new Error('An error occurred. Please try again.');
    }
  }
};
