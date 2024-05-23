import axios from 'axios';

const API_BASE_URL = 'https://localhost:7114/api/animal';

export const getAllAnimals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/GetAll`);
    return response.data;
  } catch (error) {
    console.error('Error fetching animals', error);
    throw error;
  }
};

export const createAnimal = async (animal) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Create`, animal);
    return response.data;
  } catch (error) {
    console.error('Error creating animal', error);
    throw error;
  }
};

export const deleteAnimal = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/DeleteById?id=${id}`);
  } catch (error) {
    console.error('Error deleting animal', error);
    throw error;
  }
};

export const editAnimal = async (animal) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/EditById?id=${animal.id}`,
      {
        name: animal.name,
        maxTemperature: animal.maxTemperature,
        minTemperature: animal.minTemperature,
        maxHumidity: animal.maxHumidity,
        minHumidity: animal.minHumidity,
        cloudy: animal.cloudy,
        sunny: animal.sunny,
        rain: animal.rain,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(animal.name + ' has been edited successfully');
    return response.data;
  } catch (error) {
    console.error('Error editing animal', error);
    throw error;
  }
};

export const sendNotification = async (notificationDto) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/SendNotification`,
      notificationDto
    );
    return response.data;
  } catch (error) {
    console.error('Error sending notification', error);
    throw error;
  }
};
