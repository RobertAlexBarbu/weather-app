import axios from 'axios';

const API_BASE_URL = 'https://localhost:7114/api/animal';

export const getAllAnimals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/GetAll`);
    return response.data;
  } catch (error) {
    console.error("Error fetching animals", error);
    throw error;
  }
};

export const createAnimal = async (animal) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Create`, animal);
    return response.data;
  } catch (error) {
    console.error("Error creating animal", error);
    throw error;
  }
};

export const deleteAnimal = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/DeleteById?id=${id}`);
  } catch (error) {
    console.error("Error deleting animal", error);
    throw error;
  }
};

export const editAnimal = async (id, animal) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/EditById?id=${id}`, animal);
    return response.data;
  } catch (error) {
    console.error("Error editing animal", error);
    throw error;
  }
};