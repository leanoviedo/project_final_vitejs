import axios from "axios";

const apiUrl = "https://airlabs.co/api/v9";
const apiKey = "dad12eec-58b1-4e62-879e-6e0f73fa8108";

const AirportServices = {
  fetchAirports: async () => {
    try {
      const response = await axios.get(`${apiUrl}/airports?api_key=${apiKey}`);
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los datos de aeropuertos.");
    }
  },
  fetchCities: async () => {
    try {
      const response = await axios.get(`${apiUrl}/cities?api_key=${apiKey}`);
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los datos de ciudades.");
    }
  },
  fetchCountries: async () => {
    try {
      const response = await axios.get(`${apiUrl}/countries?api_key=${apiKey}`);
      return response.data.response;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los datos de países.");
    }
  },

  fetchCitiesByCountry: async (countryCode: String) => {
    try {
      return await axios.get(
        `${apiUrl}/cities?country_code=${countryCode}&api_key=${apiKey}`
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los datos de ciudades.");
    }
  },

  fetchAirportsByCities: async (cityCode: String) => {
    try {
      return await axios.get(
        `${apiUrl}/airports?city_code=${cityCode}&api_key=${apiKey}`
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los datos de aeropuertos.");
    }
  },
};

export default AirportServices;
